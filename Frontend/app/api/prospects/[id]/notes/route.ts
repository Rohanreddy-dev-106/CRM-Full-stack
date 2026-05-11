// app/api/prospects/[id]/notes/route.ts — Proxies to Express backend
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/api";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const { content } = await req.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: "Content required" }, { status: 400 });
    }

    const res = await backendFetch(`/api/cards/${params.id}/notes`, {
      method: "POST",
      body: JSON.stringify({ content: content.trim() }),
      token,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to add note" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const note = json.data || json;

    return NextResponse.json(
      {
        id: note._id || note.id,
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
