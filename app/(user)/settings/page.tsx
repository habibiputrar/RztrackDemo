"use client";

import { Camera, ShieldCheck, Smartphone } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { AvatarCropper } from "@/components/avatar-cropper";
import { Message } from "@/components/toast";
import { useFinance } from "@/lib/data-provider";

export default function SettingsPage() {
  const { profile, updateProfile, updateAvatar } = useFinance();
  const [tab, setTab] = useState("profile");
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [cropImageUrl, setCropImageUrl] = useState("");
  const [online, setOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine);
    addEventListener("online", updateStatus);
    addEventListener("offline", updateStatus);
    return () => { removeEventListener("online", updateStatus); removeEventListener("offline", updateStatus); };
  }, []);

  const choosePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) { setMessage({ text: "File harus berupa gambar.", error: true }); return; }
    if (file.size > 5 * 1024 * 1024) { setMessage({ text: "Ukuran foto maksimal 5 MB.", error: true }); return; }
    setMessage(null);
    setCropImageUrl(URL.createObjectURL(file));
  };

  const closeCropper = () => {
    if (cropImageUrl) URL.revokeObjectURL(cropImageUrl);
    setCropImageUrl("");
  };

  const saveAvatar = async (blob: Blob) => {
    try {
      await updateAvatar(blob);
      closeCropper();
      setMessage({ text: "Foto profil berhasil diperbarui.", error: false });
    } catch (error) {
      const text = "Foto profil gagal diproses.";
      setMessage({ text, error: true });
    }
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const result = await updateProfile(String(form.get("name")), String(form.get("email")));
      setMessage({ text: result.emailConfirmationRequired ? "Profil tersimpan. Periksa email untuk mengonfirmasi alamat baru." : "Profil berhasil diperbarui.", error: false });
    } catch {
      setMessage({ text: "Profil gagal diperbarui.", error: true });
    }
  };

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));
    if (password.length < 8 || password !== confirm) { setMessage({ text: password.length < 8 ? "Password minimal 8 karakter." : "Konfirmasi password belum sama.", error: true }); return; }
    setMessage({ text: "Password demo berhasil diperbarui secara simulasi.", error: false });
  };

  return <>
    <div className="page-head"><div><h1>Pengaturan</h1><p>Kelola profil, keamanan, dan preferensi aplikasi.</p></div><span className="online-status">{online ? "Online" : "Offline"}</span></div>
    <div className="settings-grid">
      <aside className="settings-nav"><button className={tab === "profile" ? "active" : ""} onClick={() => setTab("profile")}>Profil</button><button className={tab === "security" ? "active" : ""} onClick={() => setTab("security")}>Keamanan</button><button className={tab === "app" ? "active" : ""} onClick={() => setTab("app")}>Aplikasi</button></aside>
      <section className="settings-content">
        {message && <Message text={message.text} error={message.error} />}
        {tab === "profile" && <div className="settings-section">
          <h2>Profil pengguna</h2>
          <div className="profile-photo-row">
            <button className="profile-photo-button" onClick={() => fileInput.current?.click()} aria-label="Ganti foto profil">
              {profile.avatar_url ? <Image src={profile.avatar_url} alt="Foto profil" fill sizes="88px" unoptimized /> : <span>{profile.full_name.charAt(0).toUpperCase()}</span>}
              <i><Camera size={16} /></i>
            </button>
            <div><strong>Foto profil</strong><p>Gunakan JPG, PNG, atau WebP maksimal 5 MB.</p><button className="button secondary" onClick={() => fileInput.current?.click()}><Camera size={16} />Pilih foto</button></div>
            <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={choosePhoto} />
          </div>
          <form className="form profile-form" onSubmit={saveProfile}><div className="field"><label>Nama lengkap</label><input name="name" defaultValue={profile.full_name} minLength={2} required /></div><div className="field"><label>Email</label><input name="email" type="email" defaultValue={profile.email || ""} required /></div><div className="field"><label>Role</label><input value={profile.role} readOnly /></div><button className="button primary">Simpan profil</button></form>
        </div>}
        {tab === "security" && <div className="settings-section"><h2>Ganti password</h2><p className="muted">Gunakan minimal 8 karakter dengan kombinasi yang sulit ditebak.</p><form className="form" onSubmit={changePassword}><div className="field"><label>Password baru</label><input name="password" type="password" minLength={8} required /></div><div className="field"><label>Konfirmasi password</label><input name="confirm" type="password" minLength={8} required /></div><button className="button primary">Perbarui password</button></form></div>}
        {tab === "app" && <div className="settings-section"><h2>Status aplikasi</h2><div className="insight"><ShieldCheck size={20} /><div><strong>Mode demo lokal</strong><p>Data contoh tersimpan di browser Anda menggunakan localStorage. Tidak ada koneksi ke server atau database.</p></div></div><div className="insight"><Smartphone size={20} /><div><strong>PWA siap dipasang</strong><p>Gunakan tombol instal di sidebar atau menu browser untuk memasang RZTrack.</p></div></div></div>}
      </section>
    </div>
    {cropImageUrl && <AvatarCropper imageUrl={cropImageUrl} onCancel={closeCropper} onSave={saveAvatar} />}
  </>;
}
