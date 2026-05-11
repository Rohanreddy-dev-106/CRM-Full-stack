// hooks/useDrawer.ts
"use client";

import { useState, useCallback } from "react";
import type { Prospect } from "@/types";

export function useDrawer() {
  const [open, setOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  const openDrawer = useCallback((prospect: Prospect) => {
    setSelectedProspect(prospect);
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    setTimeout(() => setSelectedProspect(null), 300); // wait for animation
  }, []);

  const updateSelected = useCallback((updated: Prospect) => {
    setSelectedProspect(updated);
  }, []);

  return { open, selectedProspect, openDrawer, closeDrawer, updateSelected };
}
