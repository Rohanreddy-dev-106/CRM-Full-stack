// app/(dashboard)/settings/page.tsx
import { Topbar } from "@/components/layout/Topbar";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-4 font-mono text-sm">Settings page</p>
          <p className="text-ink-5 font-mono text-xs mt-1">Coming soon</p>
        </div>
      </div>
    </>
  );
}
