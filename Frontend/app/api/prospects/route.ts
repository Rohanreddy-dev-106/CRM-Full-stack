// app/api/prospects/route.ts — Proxies to Express backend
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch, mapCardToProspect, toBackendStage } from "@/lib/api";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // Fetch all cards from backend (paginated, get a large page)
    const res = await backendFetch("/api/cards?page=1&limit=100", { token });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to fetch prospects" },
        { status: res.status }
      );
    }

    const json = await res.json();
    // Backend returns: { success, data: [{ _id: "Cold", prospects: [...] }, ...], pagination }
    // Frontend expects: flat Prospect[] array

    const prospects: any[] = [];

    if (json.data && Array.isArray(json.data)) {
      for (const group of json.data) {
        for (const card of group.prospects || []) {
          prospects.push(mapCardToProspect({ ...card, stage: group._id }));
        }
      }
    }

    // Now fetch notes and checklist for each prospect
    for (const prospect of prospects) {
      try {
        const notesRes = await backendFetch(
          `/api/cards/${prospect.id}/notes?page=1&limit=50`,
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
      } catch {
        // Notes fetch failed, leave empty
      }

      // If pilot closed, fetch checklist
      if (prospect.stage === "PILOT_CLOSED") {
        try {
          const clRes = await backendFetch(
            `/api/cards/${prospect.id}/checklist?page=1&limit=50`,
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
        } catch {
          // Checklist fetch failed, leave empty
        }
      }
    }

    return NextResponse.json(prospects);
  } catch (err) {
    console.error("GET /api/prospects error:", err);
    return NextResponse.json({ error: "Failed to fetch prospects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const body = await req.json();

    // Map frontend stage to backend stage
    const backendBody: any = {
      name: body.name,
      school: body.school,
      role: body.role || undefined,
      email: body.email || undefined,
      phone: body.phone || undefined,
      source: body.source || "Direct",
    };

    if (body.stage) {
      backendBody.stage = toBackendStage(body.stage);
    }
    if (body.lastContactDate) {
      backendBody.lastContactDate = body.lastContactDate;
    }
    if (body.nextFollowUpDate) {
      backendBody.nextFollowUpDate = body.nextFollowUpDate;
    }

    const res = await backendFetch("/api/cards", {
      method: "POST",
      body: JSON.stringify(backendBody),
      token,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to create prospect" },
        { status: res.status }
      );
    }

    const card = await res.json();
    const prospect = mapCardToProspect(card.data || card);
    return NextResponse.json(prospect, { status: 201 });
  } catch (err) {
    console.error("POST /api/prospects error:", err);
    return NextResponse.json({ error: "Failed to create prospect" }, { status: 500 });
  }
}
