// app/api/analytics/route.ts — Proxies to backend analytics endpoint
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/api";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await backendFetch("/api/analytics", { token });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to fetch analytics" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const data = json.data || json;

    // Ensure required fields exist so the frontend doesn't crash
    if (!data.stageBreakdown) data.stageBreakdown = [];
    if (data.totalProspects == null) data.totalProspects = 0;
    if (data.conversionRate == null) data.conversionRate = 0;
    if (data.overdueCount == null) data.overdueCount = 0;
    if (data.closedCount == null) data.closedCount = 0;

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/analytics error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
