// app/api/prospects/[id]/route.ts — Proxies to Express backend
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch, mapCardToProspect, toBackendStage, toFrontendStage } from "@/lib/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const res = await backendFetch(`/api/cards/${params.id}`, { token });
    if (!res.ok) {
      return NextResponse.json({ error: "Not found" }, { status: res.status });
    }

    const json = await res.json();
    const card = json.data || json;
    const prospect = mapCardToProspect(card);

    // Fetch notes
    try {
      const notesRes = await backendFetch(
        `/api/cards/${params.id}/notes?page=1&limit=50`,
        { token }
      );
      if (notesRes.ok) {
        const notesJson = await notesRes.json();
        prospect.notes = (notesJson.data || []).map((n: any) => ({
          id: n._id || n.id,
          prospectId: n.prospectId,
          content: n.content,
          createdAt: n.createdAt,
        }));
      }
    } catch {}

    // Fetch checklist if pilot closed
    if (prospect.stage === "PILOT_CLOSED") {
      try {
        const clRes = await backendFetch(
          `/api/cards/${params.id}/checklist?page=1&limit=50`,
          { token }
        );
        if (clRes.ok) {
          const clJson = await clRes.json();
          prospect.checklistItems = (clJson.data || []).map((item: any) => ({
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
          }));
        }
      } catch {}
    }

    return NextResponse.json(prospect);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const body = await req.json();

    // Map stage to backend format
    const backendBody: any = { ...body };
    if (body.stage) {
      backendBody.stage = toBackendStage(body.stage);
    }
    // Remove frontend-only fields
    delete backendBody.id;
    delete backendBody.notes;
    delete backendBody.checklistItems;
    delete backendBody.createdAt;
    delete backendBody.updatedAt;

    const res = await backendFetch(`/api/cards/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(backendBody),
      token,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to update prospect" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const updated = json.data || json;
    const prospect = mapCardToProspect(updated);

    // Fetch notes for updated prospect
    try {
      const notesRes = await backendFetch(
        `/api/cards/${params.id}/notes?page=1&limit=50`,
        { token }
      );
      if (notesRes.ok) {
        const notesJson = await notesRes.json();
        prospect.notes = (notesJson.data || []).map((n: any) => ({
          id: n._id || n.id,
          prospectId: n.prospectId,
          content: n.content,
          createdAt: n.createdAt,
        }));
      }
    } catch {}

    // Fetch checklist if now pilot closed
    if (prospect.stage === "PILOT_CLOSED") {
      try {
        const clRes = await backendFetch(
          `/api/cards/${params.id}/checklist?page=1&limit=50`,
          { token }
        );
        if (clRes.ok) {
          const clJson = await clRes.json();
          prospect.checklistItems = (clJson.data || []).map((item: any) => ({
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
          }));
        }
      } catch {}
    }

    return NextResponse.json(prospect);
  } catch (err) {
    console.error("PATCH /api/prospects/[id] error:", err);
    return NextResponse.json({ error: "Failed to update prospect" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const res = await backendFetch(`/api/cards/${params.id}`, {
      method: "DELETE",
      token,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to delete prospect" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/prospects/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete prospect" }, { status: 500 });
  }
}
