import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absUrl, pageMetadata } from "@/lib/seo/site";
import SupportPage from "@/components/SupportPage";

const REPO_URL = "https://github.com/wmsangel/costtrek";
const LINK_SNIPPET =
  '<a href="https://costtrek.com/">CostTrek — compare the cost of living between cities</a>';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "support",
    title: dict.support.title,
    description: dict.support.metaDescription,
  });
}

export default async function Support({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return (
    <SupportPage
      s={dict.support}
      siteUrl={absUrl(locale, "")}
      repoUrl={REPO_URL}
      linkSnippet={LINK_SNIPPET}
    />
  );
}
