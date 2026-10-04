import { AuthLayout } from "@/components/auth-layout";

export default function Layout({ children }: { children: React.ReactNode }) { return <><div style={{ background: "#111827", color: "#dbeafe", fontSize: 12, fontWeight: 600, padding: "9px 16px", textAlign: "center" }}>Mode demo publik · Data tersimpan lokal di browser</div><AuthLayout>{children}</AuthLayout></>; }
