"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Message } from "@/components/toast";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true);
    setMessage("Pada versi demo, pemulihan password hanya simulasi dan tidak mengirim email."); setLoading(false);
  };
  return <><h2>Lupa password?</h2><p>Masukkan email akun Anda untuk menerima tautan pemulihan.</p>{message && <Message text={message} />}
    <form className="auth-form" onSubmit={submit}><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="nama@email.com" required /></div><button className="button primary" disabled={loading}><MailCheck size={18} />{loading ? "Mengirim..." : "Kirim tautan pemulihan"}</button></form>
    <div className="auth-foot"><Link href="/login" className="text-link">Kembali ke login</Link></div></>;
}
