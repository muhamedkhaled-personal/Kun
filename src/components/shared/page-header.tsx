import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-slate-800 pb-6",
        className
      )}
    >
      {/* Left side - Title and description */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {/* Right side - Action */}
      {action && <div className="sm:flex-shrink-0">{action}</div>}
    </div>
  );
}
