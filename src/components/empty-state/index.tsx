import { FileSearch, LucideIcon } from "lucide-react";
import * as React from "react";

interface EmptyStateProps {
    icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  className = "",
}) => {
  const Icon = icon || FileSearch
  return (
    <div className={`flex flex-col items-center justify-center min-h-[300px] w-full ${className}`}>
      {Icon && (
        <div className="bg-slate-100 p-4 rounded-full mb-6">
          <Icon className="w-8 h-8 text-muted-foreground"  />
        </div>
      )}
      <h3 className="text-base font-medium text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm text-center mb-4">
        {description}
      </p>
      <div className="h-1 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full" />
    </div>
  );
};
