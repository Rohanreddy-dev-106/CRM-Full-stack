// app/api/prospects/route.ts — Prisma-backed prospect collection endpoint
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createOnboardingChecklist } from "../../../../Backend/src/utils/onbord.chicklist.js";
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

export async function GET() {
  try {
    const prospects = await prisma.prospect.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
        },
        checklistItems: {
          orderBy: { stepNumber: "asc" },
        },
      },
    });

    return NextResponse.json(
      prospects.map((prospect: any) => {
        const mapped = mapCardToProspect({ ...prospect, stage: toFrontendStage(prospect.stage) });
        return {
          ...mapped,
          notes: (prospect.notes || []).map(mapNote),
          checklistItems: (prospect.checklistItems || []).map(mapChecklistItem),
        };
      })
    );
  } catch (err) {
    console.error("GET /api/prospects error:", err);
    return NextResponse.json({ error: "Failed to fetch prospects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const created = await prisma.prospect.create({
      data: {
        name: body.name,
        school: body.school,
        role: body.role || null,
        email: body.email || null,
        phone: body.phone || null,
        source: body.source || "Direct",
        stage: body.stage ? toBackendStage(body.stage) : "Cold",
        lastContactDate: body.lastContactDate ? new Date(body.lastContactDate) : null,
        nextFollowUpDate: body.nextFollowUpDate ? new Date(body.nextFollowUpDate) : null,
      },
    });

    if (created.stage === "Pilot Closed") {
      await createOnboardingChecklist(created.id);
    }

    const prospect = mapCardToProspect({ ...created, stage: toFrontendStage(created.stage) });
    const fullProspect = await prisma.prospect.findUnique({
      where: { id: created.id },
      include: {
        notes: { orderBy: { createdAt: "desc" } },
        checklistItems: { orderBy: { stepNumber: "asc" } },
      },
    });

    return NextResponse.json({
      ...prospect,
      notes: (fullProspect?.notes || []).map(mapNote),
      checklistItems: (fullProspect?.checklistItems || []).map(mapChecklistItem),
    }, { status: 201 });
  } catch (err) {
    console.error("POST /api/prospects error:", err);
    return NextResponse.json({ error: "Failed to create prospect" }, { status: 500 });
  }
}
