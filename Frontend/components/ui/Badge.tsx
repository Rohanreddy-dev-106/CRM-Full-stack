// components/ui/Badge.tsx
import { cn } from "@/lib/utils";
import type { Stage } from "@/types";
import { STAGE_CONFIG } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "danger" | "warning" | "success" | "stage";
  stage?: Stage;
  className?: string;
}

export function Badge({ children, variant = "default", stage, className }: BadgeProps) {
  const base = "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium tracking-wide uppercase";

  const variants = {
    default: "bg-surface-4 text-ink-3 border border-ink-5",
    danger:  "bg-danger-muted text-danger border border-danger-border",
    warning: "bg-warning-muted text-warning border border-warning/30",
    success: "bg-success-muted text-success border border-success/30",
    stage:   "",
  };

  if (variant === "stage" && stage) {
    const config = STAGE_CONFIG[stage];
    return (
      <span
        className={cn(base, className)}
        style={{ backgroundColor: config.color + "40", color: config.accentColor, borderColor: config.accentColor + "40", border: "1px solid" }}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  );
}
