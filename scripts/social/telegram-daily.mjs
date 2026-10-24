/**
 * Дневная соц-рассылка в Telegram: присылает ГОТОВЫЙ пост на сегодня — само
 * медиа (пост / карусель / сторис / видео) + ОТДЕЛЬНЫМ сообщением подпись с
 * хэштегами, чтобы просто скопировать и выложить в Instagram. Это ops-доставка
 * контента владельцу, НЕ публичный Telegram-канал (органика, TG как канал
 * продвижения не используется).
 *
 * Источник плана — out/manifest.json (выхлоп gen.mjs): в нём уже лежат day /
 * rubric / kind / link / caption / hashtags / sticker / files. Так рассылка
 * шлёт ровно то, что реально отрисовано, без второй копии контента.
 * Сгенерить слайды:  node scripts/social/gen.mjs
 *
 * Конфиг — scripts/social/.telegram.json (НЕ коммитить; см. .telegram.json.example):
 *   { "bot_token": "123456:ABC...", "chat_id": "123456789" }
 * или env TG_BOT_TOKEN / TG_CHAT_ID.
 *
 * Бот один на всю сеть сайтов → имя проекта (CostTrek) ВСЕГДА в шапке сообщения,
 * чтобы не перепутать, что и куда выкладывать.
 *
 * Запуск:
 *   node scripts/social/telegram-daily.mjs            # пост на сегодня (по дню недели)
 *   node scripts/social/telegram-daily.mjs 03         # конкретный пост по id-префиксу (тест)
 *   node scripts/social/telegram-daily.mjs --chat-id  # показать chat_id из getUpdates (после /start боту)
 * Автозапуск раз в день — launchd (см. scripts/social/README.md).
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");
const MANIFEST = join(OUT, "manifest.json");

const PROJECT = "CostTrek";
// Хаб со всеми слайдами недели (приватный артефакт) — продублирован в сообщении.
const HUB_URL = "https://claude.ai/artifact/FghuMMyJyHa33WouaVAQ4V";

// new Date().getDay(): 0=Вс..6=Сб. В плане day = "Mon".."Sun".
const DOW_KEY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_RU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const FORMAT_RU = { carousel: "карусель", post: "пост", story: "сторис", video: "видео" };

function config() {
  let c = {};
  try {
    c = JSON.parse(readFileSync(join(HERE, ".telegram.json"), "utf8"));
  } catch {}
  const bot = process.env.TG_BOT_TOKEN || c.bot_token;
  const chat = process.env.TG_CHAT_ID || c.chat_id;
  return { bot, chat };
}

function requireConfig(needChat = true) {
  const { bot, chat } = config();
  if (!bot || (needChat && !chat)) {
    console.error(
      "Нет bot_token/chat_id. Заполни scripts/social/.telegram.json " +
        "(см. .telegram.json.example) или задай env TG_BOT_TOKEN / TG_CHAT_ID.",
    );
    process.exit(1);
  }
  return { bot, chat };
}

function loadManifest() {
  if (!existsSync(MANIFEST)) {
    console.error(
      "Нет out/manifest.json. Сначала сгенерируй слайды:\n  node scripts/social/gen.mjs",
    );
    process.exit(1);
  }
  return JSON.parse(readFileSync(MANIFEST, "utf8"));
}

async function tg(bot, method, form) {
  const res = await fetch(`https://api.telegram.org/bot${bot}/${method}`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`${method}: ${data.description}`);
  return data;
}

function fileBlob(path) {
  return new Blob([readFileSync(path)]);
}

async function sendPhoto(bot, chat, path, caption) {
  const form = new FormData();
  form.append("chat_id", chat);
  form.append("photo", fileBlob(path), basename(path));
  if (caption) form.append("caption", caption);
  await tg(bot, "sendPhoto", form);
}

async function sendVideo(bot, chat, path, caption) {
  const form = new FormData();
  form.append("chat_id", chat);
  form.append("video", fileBlob(path), basename(path));
  if (caption) form.append("caption", caption);
  await tg(bot, "sendVideo", form);
}

// Карусель → один альбом (до 10 фото). Подпись к альбому короткая (лимит 1024) —
// полный текст уходит отдельным сообщением ниже.
async function sendAlbum(bot, chat, paths, caption) {
  const chunk = paths.slice(0, 10);
  const form = new FormData();
  form.append("chat_id", chat);
  const media = chunk.map((p, i) => ({
    type: "photo",
    media: `attach://p${i}`,
    ...(i === 0 && caption ? { caption } : {}),
  }));
  form.append("media", JSON.stringify(media));
  chunk.forEach((p, i) => form.append(`p${i}`, fileBlob(p), basename(p)));
  await tg(bot, "sendMediaGroup", form);
}

async function sendText(bot, chat, text) {
  const form = new FormData();
  form.append("chat_id", chat);
  form.append("text", text);
  form.append("disable_web_page_preview", "true");
  await tg(bot, "sendMessage", form);
}

// Короткая служебная шапка под первым вложением (лимит Telegram 1024).
function headerCaption(post, dowRu) {
  const parts = [];
  parts.push(`📦 ${PROJECT} · ${dowRu} · ${post.rubric} · ${FORMAT_RU[post.kind] || post.kind}`);
  if (post.link) parts.push(`🔗 Ссылка в профиле → ${post.link}`);
  if (post.sticker) parts.push(`🎯 Стикер (добавить в IG): ${post.sticker}`);
  return parts.join("\n");
}

// Полная подпись поста + хэштеги — отдельным сообщением, чтобы скопировать целиком.
function fullCaption(post) {
  const parts = [];
  if (post.caption) parts.push(post.caption);
  if (post.hashtags) parts.push(post.hashtags);
  parts.push(`— — —\nВсе слайды недели: ${HUB_URL}`);
  return parts.join("\n\n");
}

// Разовый helper: показать chat_id из последних апдейтов (после /start боту).
async function showChatId() {
  const { bot } = requireConfig(false);
  const res = await fetch(`https://api.telegram.org/bot${bot}/getUpdates`);
  const data = await res.json();
  if (!data.ok) {
    console.error(`getUpdates: ${data.description}`);
    process.exit(1);
  }
  const chats = new Map();
  for (const u of data.result) {
    const m = u.message || u.channel_post || u.my_chat_member;
    const c = m && m.chat;
    if (c) chats.set(c.id, c);
  }
  if (!chats.size) {
    console.log(
      "Апдейтов нет. Открой бота в Telegram, нажми Start / напиши ему любое сообщение,\n" +
        "затем запусти снова: node scripts/social/telegram-daily.mjs --chat-id",
    );
    return;
  }
  console.log("Найденные чаты (впиши нужный chat_id в .telegram.json):");
  for (const c of chats.values()) {
    const who = c.title || [c.first_name, c.last_name].filter(Boolean).join(" ") || c.username || "";
    console.log(`  chat_id: ${c.id}   (${c.type}${who ? ", " + who : ""})`);
  }
}

// ─── main ───
const arg = process.argv[2];

if (arg === "--chat-id") {
  await showChatId();
  process.exit(0);
}

const { bot, chat } = requireConfig();
const manifest = loadManifest();
const now = new Date();
const todayKey = DOW_KEY[now.getDay()];
const dowRu = DOW_RU[now.getDay()];

const post = arg
  ? manifest.find((p) => p.id.startsWith(arg) || p.id === arg)
  : manifest.find((p) => p.day === todayKey);

if (!post) {
  console.log(
    arg ? `Пост «${arg}» не найден в manifest.json.` : `На ${dowRu} поста в плане нет — выходной.`,
  );
  process.exit(0);
}

const files = (post.files || []).map((f) => join(OUT, f)).filter(existsSync);
const video = post.video ? join(HERE, post.video) : null;

try {
  // 1) Медиа + служебная шапка под первым вложением.
  const header = headerCaption(post, dowRu);
  if (video && existsSync(video)) {
    await sendVideo(bot, chat, video, header);
  } else if (files.length > 1) {
    await sendAlbum(bot, chat, files, header);
  } else if (files.length === 1) {
    await sendPhoto(bot, chat, files[0], header);
  } else {
    // Нет медиа (не сгенерировано) — шлём хотя бы шапку текстом, чтобы не потерять день.
    await sendText(bot, chat, header + "\n\n⚠️ Слайды не найдены — запусти gen.mjs.");
  }

  // 2) ОТДЕЛЬНОЕ сообщение: полная подпись + хэштеги (копируешь целиком).
  const caption = fullCaption(post);
  if (caption) await sendText(bot, chat, caption);

  console.log(`Отправлено в Telegram: ${dowRu} · ${post.rubric} (${post.id})`);
} catch (e) {
  console.error("Telegram ошибка:", e.message);
  process.exit(1);
}
