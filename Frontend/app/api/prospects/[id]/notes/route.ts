// app/api/prospects/[id]/notes/route.ts — Prisma-backed notes endpoint
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { content } = await req.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: "Content required" }, { status: 400 });
    }

    const prospect = await prisma.prospect.findUnique({
      where: { id: params.id },
      select: { id: true },
    });

    if (!prospect) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const note = await prisma.prospectNote.create({
      data: {
        prospectId: params.id,
        content: content.trim(),
      },
    });

    return NextResponse.json(
      {
        id: note.id,
        prospectId: note.prospectId,
        content: note.content,
        createdAt: note.createdAt,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/prospects/[id]/notes error:", err);
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}
