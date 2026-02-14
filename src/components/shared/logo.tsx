import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "icon" | "full";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "full", className, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: 14 },
    md: { icon: 32, text: 16 },
    lg: { icon: 48, text: 20 },
  };

  const dimensions = sizeMap[size];

  const iconSVG = (
    <svg
      viewBox="0 0 48 48"
      width={dimensions.icon}
      height={dimensions.icon}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stylized K mark in gold */}
      <g>
        {/* Vertical stem */}
        <rect x="8" y="4" width="6" height="40" fill="#D4A843" rx="2" />

        {/* Upper diagonal */}
        <path
          d="M 14 14 L 34 4 L 38 8 L 18 18"
          stroke="#D4A843"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Lower diagonal */}
        <path
          d="M 14 28 L 38 44 L 34 44 L 14 28 Z"
          fill="#D4A843"
        />
        <path
          d="M 14 28 L 34 44"
          stroke="#D4A843"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );

  if (variant === "icon") {
    return iconSVG;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {iconSVG}
      <span
        className="font-bold tracking-tight text-gray-900 dark:text-white"
        style={{ fontSize: `${dimensions.text}px` }}
      >
        Kun
      </span>
    </div>
  );
}
