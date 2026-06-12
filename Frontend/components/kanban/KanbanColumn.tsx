"use client";

import { Droppable } from "@hello-pangea/dnd";
import { ProspectCard } from "./ProspectCard";
import { cn } from "@/lib/utils";
import type { Prospect, Stage } from "@/types";
import { STAGE_CONFIG } from "@/types";

interface KanbanColumnProps {
  stage: Stage;
  prospects: Prospect[];
  onCardClick: (prospect: Prospect) => void;
}

export function KanbanColumn({ stage, prospects, onCardClick }: KanbanColumnProps) {
  const config = STAGE_CONFIG[stage];

  return (
    <div className="flex w-[82vw] shrink-0 flex-col sm:w-[260px]">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: config.accentColor }} />
          <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-ink-3">
            {config.label}
          </h3>
        </div>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-xs font-bold"
          style={{
            backgroundColor: config.accentColor + "20",
            color: config.accentColor,
          }}
        >
          {prospects.length}
        </span>
      </div>

      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex min-h-[200px] flex-1 flex-col gap-2.5 rounded-xl p-2.5 transition-colors duration-200",
              snapshot.isDraggingOver ? "bg-surface-4" : "bg-surface-2"
            )}
            style={
              snapshot.isDraggingOver
                ? { boxShadow: `inset 0 0 0 1px ${config.accentColor}40, 0 0 12px ${config.accentColor}15` }
                : {}
            }
          >
            {prospects.map((prospect, index) => (
              <ProspectCard key={prospect.id} prospect={prospect} index={index} onClick={onCardClick} />
            ))}
            {provided.placeholder}

            {prospects.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-1 items-center justify-center">
                <p className="font-mono text-xs text-ink-5">Empty</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
