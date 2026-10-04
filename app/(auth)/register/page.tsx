"use client";

import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Message } from "@/components/toast";

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const score = useMemo(() => [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length, [password]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMessage(null);
    if (password.length < 8) { setMessage({ text: "Password minimal 8 karakter.", error: true }); return; }
    if (password !== confirm) { setMessage({ text: "Konfirmasi password belum sama.", error: true }); return; }
    setLoading(true);
    localStorage.setItem("rztrack-demo-session", "active");
    setLoading(false);
    setMessage({ text: "Akun demo siap digunakan. Data hanya tersimpan di browser ini.", error: false });
  };
  return <><h2>Buat akun RZTrack</h2><p>Mulai catat dan pahami arus uang Anda.</p>
    {message && <Message text={message.text} error={message.error} />}
    <form className="auth-form" onSubmit={submit}>
      <div className="field"><label htmlFor="name">Nama lengkap</label><input id="name" name="name" placeholder="Nama Anda" minLength={2} required autoComplete="name" /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="nama@email.com" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="password">Password</label><div className="password-wrap"><input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 8 karakter" required autoComplete="new-password" /><button type="button" className="icon-button" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div><div className="strength" aria-label={`Kekuatan password ${score} dari 4`}>{[1,2,3,4].map((n) => <span className={score >= n ? "on" : ""} key={n} />)}</div></div>
      <div className="field"><label htmlFor="confirm">Konfirmasi password</label><input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={confirm && confirm !== password ? "invalid" : ""} placeholder="Ulangi password" required autoComplete="new-password" /><small className="hint">{confirm && confirm !== password ? "Password belum sama" : "Gunakan kombinasi huruf besar, angka, dan simbol."}</small></div>
      <label className="check"><input type="checkbox" required /> Saya menyetujui syarat penggunaan dan kebijakan privasi.</label>
      <button className="button primary" disabled={loading}><UserPlus size={18} />{loading ? "Membuat akun..." : "Buat akun"}</button>
    </form>
    <div className="auth-foot">Sudah punya akun? <Link href="/login" className="text-link">Masuk</Link> · <Link href="/guide" className="text-link">Baca panduan</Link></div>
  </>;
}
