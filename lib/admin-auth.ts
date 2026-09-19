import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rh_admin_session";

function adminPassword() {
  const value = process.env.ADMIN_PASSWORD?.trim() ?? "";
  return value.length >= 12 ? value : "";
}

function sessionSignature(password: string, expiresAt: string) {
  return createHmac("sha256", password)
    .update(`realhoroscope-admin-session-v1:${expiresAt}`)
    .digest("hex");
}

export function passwordIsValid(candidate: string) {
  const password = adminPassword();
  if (!password || candidate.length !== password.length) return false;
  return timingSafeEqual(Buffer.from(candidate), Buffer.from(password));
}

export function sessionToken() {
  const password = adminPassword();
  if (!password) return "";
  const expiresAt = String(Date.now() + 12 * 60 * 60 * 1000);
  return `${expiresAt}.${sessionSignature(password, expiresAt)}`;
}

export async function adminAccess() {
  const password = adminPassword();
  const token = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  const [expiresAt = "", signature = ""] = token.split(".");
  const expires = Number(expiresAt);
  const expected = password && Number.isSafeInteger(expires)
    ? sessionSignature(password, expiresAt)
    : "";
  const authorized =
    Boolean(expected) &&
    expires > Date.now() &&
    expires <= Date.now() + 12 * 60 * 60 * 1000 &&
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  return { configured: Boolean(password), authorized };
}
