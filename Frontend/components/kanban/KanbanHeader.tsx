// components/kanban/KanbanHeader.tsx
"use client";

import { useState } from "react";
import { AlertTriangle, Bell, Users } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn, formatDate } from "@/lib/utils";
import type { Prospect } from "@/types";

interface KanbanHeaderProps {
  overdueCount: number;
  dueTodayCount: number;
  totalCount: number;
  overdueProspects: Prospect[];
  dueTodayProspects: Prospect[];
  onProspectClick: (prospect: Prospect) => void;
}

export function KanbanHeader({
  overdueCount,
  dueTodayCount,
  totalCount,
  overdueProspects,
  dueTodayProspects,
  onProspectClick,
}: KanbanHeaderProps) {
  const [expanded, setExpanded] = useState<"overdue" | "today" | null>(null);

  return (
    <div className="px-6 py-3 border-b border-ink-5 flex flex-col gap-2">
      {/* Stats row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-ink-4">
          <Users className="w-4 h-4" />
          <span className="text-sm font-mono">{totalCount} prospects</span>
        </div>

        <div className="h-4 w-px bg-ink-5" />

        {/* Overdue */}
        <button
          onClick={() => setExpanded(expanded === "overdue" ? null : "overdue")}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors",
            overdueCount > 0
              ? "bg-danger-muted text-danger hover:bg-danger/20"
              : "text-ink-4 hover:text-ink-3"
          )}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          {overdueCount} overdue
        </button>

        {/* Due today */}
        <button
          onClick={() => setExpanded(expanded === "today" ? null : "today")}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors",
            dueTodayCount > 0
              ? "bg-warning-muted text-warning hover:bg-warning/20"
              : "text-ink-4 hover:text-ink-3"
          )}
        >
          <Bell className="w-3.5 h-3.5" />
          {dueTodayCount} due today
        </button>
      </div>

      {/* Expanded list */}
      {expanded && (
        <div className="animate-fade-in bg-surface-2 rounded-lg border border-ink-5 p-3">
          <p className="text-[11px] font-mono text-ink-4 uppercase tracking-widest mb-2">
            {expanded === "overdue" ? "Overdue Follow-ups" : "Due Today"}
          </p>
          <div className="flex flex-wrap gap-2">
            {(expanded === "overdue" ? overdueProspects : dueTodayProspects).map((p) => (
              <button
                key={p.id}
                onClick={() => { onProspectClick(p); setExpanded(null); }}
                className="flex items-center gap-2 bg-surface-3 hover:bg-surface-4 border border-ink-5 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Avatar name={p.name} size="sm" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-ink-1">{p.name}</p>
                  <p className="text-[11px] text-ink-4 font-mono">{formatDate(p.nextFollowUpDate)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
