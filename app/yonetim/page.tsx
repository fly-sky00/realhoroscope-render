import type { Metadata } from "next";
import { AdminInbox } from "@/components/admin-inbox";
import { AdminLogin } from "@/components/admin-login";
import { adminAccess } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Yönetim", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const access = await adminAccess();
  return (
    <main id="ana-icerik" className="page-main">
      <div className="site-shell">
        <h1 className="display text-4xl">Mesajlar ve yorumlar</h1>
        <p className="mt-3 text-slate-300">
          İletişim taleplerini inceleyin, topluluk yorumlarını yönetin.
        </p>
        {access.authorized ? (
          <AdminInbox />
        ) : (
          <AdminLogin configured={access.configured} />
        )}
      </div>
    </main>
  );
}
