"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
  };

  const dimensions = sizeMap[size];

  return (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 50 50"
      className={cn("animate-spin", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.1"
      />

      {/* Animated arc */}
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="#D4A843"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.4 125.6"
        fill="none"
      />
    </svg>
  );
}

interface PageLoadingProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PageLoading({ fullScreen = true, size = "md" }: PageLoadingProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-950"
    : "flex items-center justify-center min-h-screen bg-white dark:bg-slate-950";

  return (
    <div className={containerClasses}>
      <LoadingSpinner size={size} />
    </div>
  );
}
