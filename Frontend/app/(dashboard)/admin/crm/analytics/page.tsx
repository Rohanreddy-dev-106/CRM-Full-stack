// app/(dashboard)/admin/crm/analytics/page.tsx
import { Topbar } from "@/components/layout/Topbar";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <>
      <Topbar title="CRM Analytics" />
      <div className="flex-1 overflow-y-auto">
        <AnalyticsDashboard />
      </div>
    </>
  );
}
