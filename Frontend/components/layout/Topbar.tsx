"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NotificationBell } from "./NotificationBell";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface TopbarProps {
  title: string;
  onAddProspect?: () => void;
}

export function Topbar({ title, onAddProspect }: TopbarProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-ink-5 bg-surface-1 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
      <h1 className="text-base font-semibold text-ink-1 sm:text-lg">{title}</h1>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="relative min-w-0 flex-1 sm:flex-none">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-5" />
          <input
            type="search"
            placeholder="Search prospects..."
            className="w-full rounded-md border border-ink-5 bg-surface-3 py-2 pl-8 pr-3 text-sm text-ink-1 placeholder:text-ink-5 focus:border-brand-500 focus:outline-none sm:w-52"
          />
        </div>
        <ThemeToggle className="inline-flex" />
        <NotificationBell />
        {onAddProspect && (
          <Button size="sm" onClick={onAddProspect} className="px-3 sm:px-4">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Prospect</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}
      </div>
    </header>
  );
}
