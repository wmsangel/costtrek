// Decorative Tien-Shan-ish ridge line for magazine cover blocks.
export default function Mountains({
  className = "",
  width = 420,
  height = 170,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 420 170"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="0,170 80,70 140,120 220,35 290,115 350,60 420,130 420,170"
        fill="currentColor"
        opacity="0.12"
      />
      <polygon
        points="140,170 220,80 300,135 370,65 420,105 420,170"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}
