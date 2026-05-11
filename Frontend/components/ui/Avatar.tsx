// components/ui/Avatar.tsx
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const AVATAR_COLORS = [
  "bg-brand-800 text-brand-200",
  "bg-purple-900 text-purple-200",
  "bg-amber-900 text-amber-200",
  "bg-emerald-900 text-emerald-200",
  "bg-rose-900 text-rose-200",
  "bg-indigo-900 text-indigo-200",
];

function getColorFromName(name: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function Avatar({ name, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-mono font-semibold shrink-0",
        sizes[size],
        getColorFromName(name),
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
}
