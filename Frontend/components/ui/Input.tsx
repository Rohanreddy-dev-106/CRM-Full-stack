// components/ui/Input.tsx
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface-3 border border-ink-5 rounded-md px-3 py-2 text-sm text-ink-1 placeholder:text-ink-4",
            "focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30",
            "transition-colors duration-150",
            error && "border-danger focus:border-danger focus:ring-danger/30",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger font-mono">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
