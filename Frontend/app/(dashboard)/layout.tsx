// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-0 md:flex-row md:overflow-hidden">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col min-h-0">{children}</main>
    </div>
  );
}
