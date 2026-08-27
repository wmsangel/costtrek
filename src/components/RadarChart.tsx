/**
 * Lightweight radar/spider chart — pure server-rendered inline SVG, no client
 * JS and no charting library. Colours come through CSS variables so it tracks
 * the light/dark theme. Values are plotted against a shared `max`.
 */
type Series = { label: string; color: string; values: number[] };

export default function RadarChart({
  axes,
  series,
  max,
  size = 340,
}: {
  axes: string[];
  series: Series[];
  max: number;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.32;
  const N = axes.length;

  const point = (i: number, val: number): [number, number] => {
    const ang = (-90 + (i * 360) / N) * (Math.PI / 180);
    const r = R * Math.min(val / max, 1.06);
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  };
  const points = (vals: number[]) =>
    vals.map((v, i) => point(i, v).map((n) => n.toFixed(1)).join(",")).join(" ");

  const pad = size * 0.17;
  const viewBox = `${-pad} ${-pad * 0.7} ${size + pad * 2} ${size + pad * 1.3}`;
  const labelFont = { fontFamily: "var(--font-display), sans-serif" };

  return (
    <svg
      viewBox={viewBox}
      width="100%"
      style={{ maxWidth: size + pad * 2, height: "auto" }}
      role="img"
      aria-label={`Radar comparison of ${series.map((s) => s.label).join(" and ")} across ${axes.join(", ")}`}
    >
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <polygon
          key={g}
          points={axes
            .map((_, i) => point(i, max * g).map((n) => n.toFixed(1)).join(","))
            .join(" ")}
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth={1}
          opacity={g === 1 ? 0.9 : 0.4}
        />
      ))}

      {axes.map((lab, i) => {
        const end = point(i, max);
        const at = point(i, max * 1.17);
        const anchor = at[0] < cx - 4 ? "end" : at[0] > cx + 4 ? "start" : "middle";
        return (
          <g key={lab}>
            <line
              x1={cx}
              y1={cy}
              x2={end[0].toFixed(1)}
              y2={end[1].toFixed(1)}
              stroke="var(--border-strong)"
              strokeWidth={1}
              opacity={0.4}
            />
            <text
              x={at[0].toFixed(1)}
              y={at[1].toFixed(1)}
              fill="var(--muted)"
              fontWeight={700}
              fontSize={12}
              textAnchor={anchor}
              dominantBaseline="middle"
              style={labelFont}
            >
              {lab}
            </text>
          </g>
        );
      })}

      {series.map((s) => (
        <polygon
          key={s.label}
          points={points(s.values)}
          fill={s.color}
          fillOpacity={0.16}
          stroke={s.color}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      ))}
      {series.map((s) =>
        s.values.map((v, i) => {
          const p = point(i, v);
          return (
            <circle
              key={`${s.label}-${i}`}
              cx={p[0].toFixed(1)}
              cy={p[1].toFixed(1)}
              r={3.2}
              fill={s.color}
            />
          );
        }),
      )}
    </svg>
  );
}
