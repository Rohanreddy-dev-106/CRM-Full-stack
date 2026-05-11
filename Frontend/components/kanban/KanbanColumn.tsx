// components/kanban/KanbanColumn.tsx
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
    <div className="flex flex-col w-[260px] shrink-0">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: config.accentColor }}
          />
          <h3 className="text-xs font-mono font-semibold text-ink-3 uppercase tracking-widest">
            {config.label}
          </h3>
        </div>
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: config.accentColor + "20",
            color: config.accentColor,
          }}
        >
          {prospects.length}
        </span>
      </div>

      {/* Drop zone */}
      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 flex flex-col gap-2.5 rounded-xl p-2.5 min-h-[200px] transition-colors duration-200",
              snapshot.isDraggingOver
                ? "bg-surface-4"
                : "bg-surface-2",
            )}
            style={
              snapshot.isDraggingOver
                ? { boxShadow: `inset 0 0 0 1px ${config.accentColor}40, 0 0 12px ${config.accentColor}15` }
                : {}
            }
          >
            {prospects.map((prospect, index) => (
              <ProspectCard
                key={prospect.id}
                prospect={prospect}
                index={index}
                onClick={onCardClick}
              />
            ))}
            {provided.placeholder}

            {prospects.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xs text-ink-5 font-mono">Empty</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
