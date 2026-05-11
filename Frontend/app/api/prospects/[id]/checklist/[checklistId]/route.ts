// app/api/prospects/[id]/checklist/[checklistId]/route.ts — Proxies to Express backend
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/api";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; checklistId: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const { status } = await req.json();
    // Frontend sends "TODO"/"DONE", backend expects "todo"/"done"
    const backendStatus = status.toLowerCase();

    const res = await backendFetch(`/api/checklist/${params.checklistId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: backendStatus }),
      token,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to update" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const item = json.data || json;

    return NextResponse.json({
      id: item._id || item.id,
      prospectId: item.prospectId,
      stepNumber: item.stepNumber,
      title: item.title,
      description: item.description || "",
      assignee: item.assignee || "",
      status: item.status === "done" ? "DONE" : "TODO",
      dueDate: item.dueDate || null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt || item.createdAt,
    });
  } catch (err) {
    console.error("PATCH checklist error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
