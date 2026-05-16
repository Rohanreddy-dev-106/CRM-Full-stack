// app/api/prospects/[id]/route.ts — Prisma-backed single prospect endpoint
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createOnboardingChecklist } from "../../../../../Backend/src/utils/onbord.chicklist.js";
import { mapCardToProspect, toBackendStage, toFrontendStage } from "@/lib/api";

function mapNote(note: any) {
  return {
    id: note.id,
    prospectId: note.prospectId,
    content: note.content,
    createdAt: note.createdAt,
  };
}

function mapChecklistItem(item: any) {
  return {
    id: item.id,
    prospectId: item.prospectId,
    stepNumber: item.stepNumber,
    title: item.title,
    description: item.description || "",
    assignee: item.assignee || "",
    status: item.status === "done" ? "DONE" : "TODO",
    dueDate: item.dueDate || null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt || item.createdAt,
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prospect = await prisma.prospect.findUnique({
      where: { id: params.id },
      include: {
        notes: { orderBy: { createdAt: "desc" } },
        checklistItems: { orderBy: { stepNumber: "asc" } },
      },
    });

    if (!prospect) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...mapCardToProspect({ ...prospect, stage: toFrontendStage(prospect.stage) }),
      notes: (prospect.notes || []).map(mapNote),
      checklistItems: (prospect.checklistItems || []).map(mapChecklistItem),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const existing = await prisma.prospect.findUnique({
      where: { id: params.id },
      select: { stage: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data: Record<string, any> = {
      name: body.name,
      school: body.school,
      role: body.role ?? undefined,
      email: body.email ?? undefined,
      phone: body.phone ?? undefined,
      source: body.source ?? undefined,
      lastContactDate: body.lastContactDate ? new Date(body.lastContactDate) : undefined,
      nextFollowUpDate: body.nextFollowUpDate ? new Date(body.nextFollowUpDate) : undefined,
    };

    if (body.stage) {
      data.stage = toBackendStage(body.stage);
    }

    for (const key of ["id", "notes", "checklistItems", "createdAt", "updatedAt"]) {
      delete (data as any)[key];
    }

    const updated = await prisma.prospect.update({
      where: { id: params.id },
      data,
    });

    if (existing.stage !== "Pilot Closed" && updated.stage === "Pilot Closed") {
      await createOnboardingChecklist(updated.id);
    }

    const prospect = await prisma.prospect.findUnique({
      where: { id: params.id },
      include: {
        notes: { orderBy: { createdAt: "desc" } },
        checklistItems: { orderBy: { stepNumber: "asc" } },
      },
    });

    return NextResponse.json({
      ...mapCardToProspect({ ...updated, stage: toFrontendStage(updated.stage) }),
      notes: (prospect?.notes || []).map(mapNote),
      checklistItems: (prospect?.checklistItems || []).map(mapChecklistItem),
    });
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
    const existing = await prisma.prospect.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.prospect.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/prospects/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete prospect" }, { status: 500 });
  }
}
