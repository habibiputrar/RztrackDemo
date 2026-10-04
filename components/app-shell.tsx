"use client";

import { BarChart3, Bell, ChevronDown, CircleDollarSign, Goal, LayoutDashboard, LogOut, Menu, ReceiptText, Settings, ShieldCheck, UserRound, WalletCards, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { InstallPwa } from "./install-pwa";
import { useFinance } from "@/lib/data-provider";

const navigation = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/transactions", label: "Transaksi", icon: ReceiptText },
  { href: "/wallets", label: "Dompet", icon: WalletCards },
  { href: "/budgets", label: "Anggaran", icon: CircleDollarSign },
  { href: "/goals", label: "Target", icon: Goal },
  { href: "/analytics", label: "Analitik", icon: BarChart3 },
  { href: "/settings", label: "Pengaturan", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userMenu = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useFinance();
  useEffect(() => {
    const close = (event: PointerEvent) => { if (userMenu.current && !userMenu.current.contains(event.target as Node)) setUserOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const logout = async () => {
    localStorage.removeItem("rztrack-demo-session");
    router.push("/login"); router.refresh();
  };
  return <div className="app-shell">
    {open && <button className="scrim" aria-label="Tutup menu" onClick={() => setOpen(false)} />}
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-head"><Logo /><button className="mobile-close icon-button" onClick={() => setOpen(false)}><X /></button></div>
      <nav>{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} className={pathname === href ? "active" : ""}><Icon size={19} />{label}</Link>)}</nav>
      {profile.role === "admin" && <Link href="/admin" className="admin-link"><ShieldCheck size={19} /> Panel admin</Link>}
      <div className="sidebar-bottom"><InstallPwa /><button onClick={logout} className="logout"><LogOut size={18} /> Keluar</button></div>
    </aside>
    <div className="app-main">
      <header className="topbar"><button className="mobile-menu icon-button" onClick={() => setOpen(true)}><Menu /></button><div className="topbar-spacer" /><button className="icon-button" aria-label="Notifikasi"><Bell size={20} /></button><div className="user-menu-wrap" ref={userMenu}><button className="user-menu" onClick={() => setUserOpen((value) => !value)} aria-expanded={userOpen}><span className="avatar">{profile.avatar_url ? <Image src={profile.avatar_url} alt="Foto profil" fill sizes="38px" unoptimized /> : profile.full_name.charAt(0).toUpperCase()}</span><span><strong>{profile.full_name}</strong><small>{profile.role === "admin" ? "Administrator" : "Pengguna"}</small></span><ChevronDown size={16} /></button>{userOpen && <div className="user-dropdown"><div className="user-dropdown-head"><span className="avatar">{profile.avatar_url ? <Image src={profile.avatar_url} alt="Foto profil" fill sizes="38px" unoptimized /> : profile.full_name.charAt(0).toUpperCase()}</span><div><strong>{profile.full_name}</strong><small>{profile.email}</small></div></div><Link href="/settings" onClick={() => setUserOpen(false)}><UserRound size={17} />Edit profil</Link><button onClick={logout}><LogOut size={17} />Keluar</button></div>}</div></header>
      <main>{children}</main>
    </div>
  </div>;
}
