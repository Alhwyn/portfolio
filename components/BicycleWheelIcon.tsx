import { cn } from "@/lib/utils";

export function BicycleWheelIcon({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className, spin && "animate-spin")}
    >
      {/* Outer rim */}
      <circle cx="12" cy="12" r="9" />
      {/* Hub */}
      <circle cx="12" cy="12" r="1.5" />
      {/* Spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 12 + 7.5 * Math.cos(rad);
        const y = 12 + 7.5 * Math.sin(rad);
        return <line key={angle} x1="12" y1="12" x2={x} y2={y} />;
      })}
    </svg>
  );
}
