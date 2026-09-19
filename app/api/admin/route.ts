import { desc, eq, lt } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { comments, messages } from "@/db/schema";
import { adminAccess } from "@/lib/admin-auth";
import { originMatchesRequest, readFormJson } from "@/lib/form-guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStore = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const access = await adminAccess();
  if (!access.authorized) {
    return Response.json({ error: "Yetkili giriş gereklidir." }, { status: 403, headers: noStore });
  }

  const url = new URL(request.url);
  const kind = url.searchParams.get("kind") === "comments" ? "comments" : "messages";
  const before = Number(url.searchParams.get("before") || 2147483647);
  if (!Number.isSafeInteger(before) || before < 1) {
    return Response.json({ error: "Geçersiz sayfa." }, { status: 400, headers: noStore });
  }

  try {
    const db = getDb();
    const rows = kind === "comments"
      ? await db
          .select({
            id: comments.id,
            name: comments.name,
            message: comments.message,
            status: comments.status,
            created_at: comments.createdAt,
          })
          .from(comments)
          .where(lt(comments.id, before))
          .orderBy(desc(comments.id))
          .limit(31)
      : await db
          .select({
            id: messages.id,
            name: messages.name,
            email: messages.email,
            subject: messages.subject,
            message: messages.message,
            status: messages.status,
            created_at: messages.createdAt,
          })
          .from(messages)
          .where(lt(messages.id, before))
          .orderBy(desc(messages.id))
          .limit(31);

    const items = rows.slice(0, 30);
    return Response.json(
      { items, next: rows.length > 30 ? items[items.length - 1]?.id ?? null : null },
      { headers: noStore },
    );
  } catch (error) {
    console.error("admin-read-failed", error);
    return Response.json(
      { error: "Kayıtlar yüklenemedi. Yeniden deneyin." },
      { status: 503, headers: noStore },
    );
  }
}

const updateSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("comments"),
    id: z.number().int().positive(),
    status: z.enum(["approved", "rejected", "pending"]),
  }),
  z.object({
    kind: z.literal("messages"),
    id: z.number().int().positive(),
    status: z.enum(["new", "reviewed", "closed"]),
  }),
]);

export async function PATCH(request: Request) {
  const access = await adminAccess();
  if (!access.authorized) {
    return Response.json({ error: "Yetkili giriş gereklidir." }, { status: 403, headers: noStore });
  }
  if (!originMatchesRequest(request)) {
    return Response.json({ error: "Geçersiz kaynak." }, { status: 403, headers: noStore });
  }

  try {
    const body = updateSchema.parse(await readFormJson(request));
    const db = getDb();
    const updated = body.kind === "comments"
      ? await db
          .update(comments)
          .set({ status: body.status })
          .where(eq(comments.id, body.id))
          .returning({ id: comments.id })
      : await db
          .update(messages)
          .set({ status: body.status })
          .where(eq(messages.id, body.id))
          .returning({ id: messages.id });

    if (!updated[0]) {
      return Response.json({ error: "Kayıt bulunamadı." }, { status: 404, headers: noStore });
    }
    return Response.json({ ok: true }, { headers: noStore });
  } catch (error) {
    console.error("admin-update-failed", error);
    return Response.json({ error: "İşlem tamamlanamadı." }, { status: 400, headers: noStore });
  }
}
