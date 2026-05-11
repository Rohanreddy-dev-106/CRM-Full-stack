// components/modals/AddProspectModal.tsx
"use client";

import { useState } from "react";
import { X, Building2, User, Mail, Phone, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Prospect, Stage } from "@/types";
import { STAGE_ORDER, STAGE_CONFIG } from "@/types";

interface AddProspectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: Omit<Prospect, "id" | "createdAt" | "updatedAt" | "notes" | "checklistItems">) => Promise<void>;
}

export function AddProspectModal({ open, onClose, onCreate }: AddProspectModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    school: "",
    role: "",
    email: "",
    phone: "",
    source: "Direct",
    stage: "COLD" as Stage,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.school.trim()) return;

    setLoading(true);
    try {
      await onCreate({
        ...form,
        lastContactDate: null,
        nextFollowUpDate: null,
      });
      // Reset form
      setForm({ name: "", school: "", role: "", email: "", phone: "", source: "Direct", stage: "COLD" });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-surface-1 border border-ink-5 rounded-2xl shadow-card w-full max-w-lg animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-ink-5">
            <h2 className="text-base font-semibold text-ink-1">Add Prospect</h2>
            <button
              onClick={onClose}
              className="text-ink-4 hover:text-ink-1 transition-colors p-1 rounded hover:bg-surface-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
                Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-5 pointer-events-none" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Contact name"
                  required
                  className="w-full bg-surface-3 border border-ink-5 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink-1 placeholder:text-ink-5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                />
              </div>
            </div>

            {/* School */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
                School *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-5 pointer-events-none" />
                <input
                  type="text"
                  value={form.school}
                  onChange={(e) => updateField("school", e.target.value)}
                  placeholder="School name"
                  required
                  className="w-full bg-surface-3 border border-ink-5 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink-1 placeholder:text-ink-5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                />
              </div>
            </div>

            {/* Role + Email row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
                  Role
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  placeholder="e.g. Principal"
                  className="w-full bg-surface-3 border border-ink-5 rounded-lg px-3 py-2.5 text-sm text-ink-1 placeholder:text-ink-5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="email@school.com"
                  className="w-full bg-surface-3 border border-ink-5 rounded-lg px-3 py-2.5 text-sm text-ink-1 placeholder:text-ink-5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                />
              </div>
            </div>

            {/* Phone + Source row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
                  Phone
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-surface-3 border border-ink-5 rounded-lg px-3 py-2.5 text-sm text-ink-1 placeholder:text-ink-5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
                  Source
                </label>
                <select
                  value={form.source}
                  onChange={(e) => updateField("source", e.target.value)}
                  className="w-full bg-surface-3 border border-ink-5 rounded-lg px-3 py-2.5 text-sm text-ink-1 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors appearance-none cursor-pointer"
                >
                  <option value="Direct">Direct</option>
                  <option value="Referral">Referral</option>
                  <option value="Website">Website</option>
                  <option value="Event">Event</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>
            </div>

            {/* Stage */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ink-3 uppercase tracking-wider font-mono">
                Initial Stage
              </label>
              <div className="flex flex-wrap gap-2">
                {STAGE_ORDER.map((stage) => {
                  const config = STAGE_CONFIG[stage];
                  const active = form.stage === stage;
                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => updateField("stage", stage)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all",
                        active
                          ? "border-transparent"
                          : "border-ink-5 text-ink-4 hover:border-ink-4 hover:text-ink-3"
                      )}
                      style={
                        active
                          ? { backgroundColor: config.accentColor + "30", color: config.accentColor, borderColor: config.accentColor + "50" }
                          : {}
                      }
                    >
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-ink-5">
              <Button variant="ghost" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" loading={loading} disabled={!form.name.trim() || !form.school.trim()}>
                Create Prospect
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
