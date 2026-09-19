import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, passwordIsValid, sessionToken } from "@/lib/admin-auth";
import { formGuard, originMatchesRequest, readFormJson } from "@/lib/form-guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({ password: z.string().min(1).max(256) });

export async function POST(request: Request) {
  try {
    const blocked = await formGuard(request, "admin-login");
    if (blocked) return blocked;
    const body = schema.parse(await readFormJson(request));
    if (!passwordIsValid(body.password)) {
      return NextResponse.json({ error: "Yönetim şifresi hatalı." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, sessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Şifre gereklidir." }, { status: 400 });
    }
    console.error("admin-login-failed", error);
    return NextResponse.json({ error: "Giriş şu anda tamamlanamadı." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!originMatchesRequest(request)) {
    return NextResponse.json({ error: "Geçersiz kaynak." }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
