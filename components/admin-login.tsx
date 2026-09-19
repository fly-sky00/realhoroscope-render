"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Giriş tamamlanamadı.");
      window.location.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Giriş tamamlanamadı.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel mt-6 max-w-xl p-6">
      {configured ? (
        <form onSubmit={submit}>
          <label className="font-semibold" htmlFor="admin-password">
            Yönetim şifresi
          </label>
          <Input
            id="admin-password"
            className="mt-3"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={busy}
            required
          />
          <Button className="mt-4" disabled={busy} type="submit">
            {busy ? "Giriş yapılıyor…" : "Yönetimi aç"}
          </Button>
          <p className="mt-3 text-sm text-rose-200" role="alert">
            {error}
          </p>
        </form>
      ) : (
        <p className="text-slate-300">
          Yönetim erişimi henüz yapılandırılmadı. Sunucu ortamına ADMIN_PASSWORD ekleyin.
        </p>
      )}
    </section>
  );
}
