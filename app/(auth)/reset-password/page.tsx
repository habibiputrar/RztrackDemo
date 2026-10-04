"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Message } from "@/components/toast";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [done, setDone] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget); const password = String(form.get("password")); const confirm = String(form.get("confirm"));
    if (password.length < 8 || password !== confirm) { setMessage({ text: password.length < 8 ? "Password minimal 8 karakter." : "Konfirmasi password belum sama.", error: true }); return; }
    setMessage({ text: "Password demo berhasil diperbarui secara simulasi. Silakan masuk kembali.", error: false }); setDone(true);
  };
  return <><h2>Atur password baru</h2><p>Buat password yang kuat dan belum pernah digunakan sebelumnya.</p>{message && <Message text={message.text} error={message.error} />}{done ? <Link href="/login" className="button primary">Masuk ke RZTrack</Link> : <form className="auth-form" onSubmit={submit}><div className="field"><label>Password baru</label><input name="password" type="password" minLength={8} required /></div><div className="field"><label>Konfirmasi password</label><input name="confirm" type="password" minLength={8} required /></div><button className="button primary"><KeyRound size={18} />Simpan password baru</button></form>}</>;
}
