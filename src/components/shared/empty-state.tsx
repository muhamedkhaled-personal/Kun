import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  iconClassName?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  iconClassName,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "mb-4 rounded-lg bg-gray-100 dark:bg-slate-800 p-3",
          iconClassName
        )}
      >
        <Icon
          className="h-8 w-8 text-gray-400 dark:text-slate-500"
          strokeWidth={1.5}
        />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-6 max-w-sm text-sm text-gray-600 dark:text-slate-400">
        {description}
      </p>

      {/* Action */}
      {action && <div>{action}</div>}
    </div>
  );
}
