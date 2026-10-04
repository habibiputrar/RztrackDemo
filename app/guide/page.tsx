import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  CircleDollarSign,
  Download,
  Goal,
  Headphones,
  Lightbulb,
  LogIn,
  MailCheck,
  PlusCircle,
  ReceiptText,
  Settings,
  ShieldCheck,
  Smartphone,
  UserPlus,
  WalletCards
} from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Buku Panduan",
  description: "Panduan lengkap menggunakan RZTrack."
};

const steps = [
  { id: "daftar", group: "account", icon: UserPlus, number: "01", title: "Mendaftarkan akun", description: "Buat akun pribadi untuk mulai menyimpan data keuangan.", items: ["Buka halaman Register melalui tombol Daftar sekarang.", "Isi nama lengkap dan alamat email yang masih aktif.", "Buat password minimal 8 karakter dengan kombinasi huruf besar, angka, dan simbol.", "Ketik ulang password, setujui syarat penggunaan, lalu tekan Buat akun."] },
  { id: "verifikasi", group: "account", icon: MailCheck, number: "02", title: "Memverifikasi email", description: "Aktifkan akun melalui email konfirmasi yang dikirim RZTrack.", items: ["Buka kotak masuk email yang digunakan saat mendaftar.", "Cari email dari RZTrack, lalu tekan tombol Verifikasi email.", "Jika belum terlihat, periksa folder Spam atau Promosi dan tunggu beberapa menit.", "Setelah berhasil, kembali ke halaman Login."] },
  { id: "login", group: "account", icon: LogIn, number: "03", title: "Login ke RZTrack", description: "Masuk ke ruang kerja sesuai peran akun Anda.", items: ["Masukkan email dan password yang telah didaftarkan.", "Tekan Masuk. Pengguna diarahkan ke dashboard dan admin ke panel admin.", "Gunakan Lupa password jika Anda tidak dapat mengingat password akun."] },
  { id: "dompet", group: "finance", icon: WalletCards, number: "04", title: "Membuat dompet", description: "Pisahkan saldo cash, rekening bank, dan e-wallet.", items: ["Buka menu Dompet, lalu pilih Tambah dompet.", "Masukkan nama seperti Uang Tunai, BCA, DANA, GoPay, atau OVO.", "Pilih jenis cash, rekening bank, atau e-wallet dan masukkan saldo awal.", "Saldo setiap dompet akan dihitung secara terpisah."] },
  { id: "transaksi", group: "finance", icon: ReceiptText, number: "05", title: "Mencatat transaksi", description: "Catat setiap uang masuk, keluar, dan perpindahan saldo.", items: ["Buka Transaksi dan tekan Tambah transaksi.", "Pilih Pemasukan atau Pengeluaran, dompet, nominal, kategori, catatan, dan tanggal.", "Gunakan jenis Transfer untuk memindahkan saldo antar-dompet.", "Transfer tidak dihitung sebagai pemasukan atau pengeluaran."] },
  { id: "anggaran", group: "finance", icon: CircleDollarSign, number: "06", title: "Membuat anggaran bulanan", description: "Tentukan batas pengeluaran untuk setiap kategori.", items: ["Buka Anggaran dan pilih bulan yang ingin diatur.", "Tekan Buat anggaran, lalu pilih kategori dan batas pengeluaran.", "Indikator berubah ketika penggunaan mendekati atau melewati anggaran."] },
  { id: "target", group: "finance", icon: Goal, number: "07", title: "Membuat target keuangan", description: "Pantau progres tabungan menuju tujuan tertentu.", items: ["Buka menu Target dan tekan Tambah target.", "Isi nama tujuan, target nominal, jumlah terkumpul, dan tenggat.", "Gunakan tombol edit pada kartu target untuk memperbarui progres tabungan."] },
  { id: "analitik", group: "insight", icon: BarChart3, number: "08", title: "Membaca dashboard dan analitik", description: "Lihat kondisi keuangan per bulan dalam bentuk visual.", items: ["Gunakan pemilih bulan untuk membuka laporan periode tertentu.", "Dashboard menampilkan saldo, pemasukan, pengeluaran, anggaran, grafik harian, kategori, dan saldo setiap dompet.", "Perubahan transaksi diperbarui melalui Supabase Realtime tanpa memuat ulang halaman."] },
  { id: "laporan", group: "insight", icon: Download, number: "09", title: "Mengunduh laporan", description: "Simpan riwayat bulanan sebagai CSV atau PDF.", items: ["Pada halaman Transaksi, pilih bulan lalu tekan CSV untuk mengunduh daftar transaksi.", "Pada halaman Analitik, tekan Simpan PDF dan pilih Save as PDF pada dialog cetak browser."] },
  { id: "keamanan", group: "insight", icon: Settings, number: "10", title: "Profil dan keamanan", description: "Kelola identitas akun dan keamanan akses.", items: ["Buka Pengaturan → Profil untuk mengubah nama atau email.", "Perubahan email harus dikonfirmasi melalui tautan yang dikirim ke alamat baru.", "Buka Pengaturan → Keamanan untuk mengganti password. Sesi pada perangkat lain akan dikeluarkan."] },
  { id: "pwa", group: "insight", icon: Smartphone, number: "11", title: "Memasang sebagai aplikasi", description: "Pasang RZTrack di layar utama perangkat Anda.", items: ["Gunakan tombol Instal aplikasi pada sidebar jika tersedia.", "Di iPhone, buka menu Share Safari lalu pilih Add to Home Screen.", "RZTrack akan muncul di layar utama seperti aplikasi biasa."] }
];

const chapters = [
  { id: "akun", key: "account", number: "01", eyebrow: "Persiapan akun", title: "Mulai menggunakan RZTrack", description: "Selesaikan pendaftaran dan masuk ke ruang kerja Anda." },
  { id: "pencatatan", key: "finance", number: "02", eyebrow: "Pencatatan keuangan", title: "Bangun catatan yang rapi", description: "Atur sumber uang, transaksi, anggaran, dan tujuan keuangan." },
  { id: "laporan-keamanan", key: "insight", number: "03", eyebrow: "Laporan & pengaturan", title: "Pahami hasil dan jaga akun", description: "Baca visualisasi bulanan, unduh laporan, dan kelola keamanan." }
];

export default function GuidePage() {
  return <main className="guide-page guide-v2">
    <header className="guide-v2-top">
      <Logo />
      <div className="guide-top-actions">
        <span><ShieldCheck size={15} /> Panduan resmi</span>
        <Link href="/login" className="button secondary"><ArrowLeft size={17} />Kembali ke login</Link>
      </div>
    </header>

    <section className="guide-v2-hero">
      <div className="guide-hero-copy">
        <span className="guide-v2-label"><BookOpenCheck size={17} /> Pusat panduan RZTrack</span>
        <h1>Kelola uang dengan benar sejak catatan pertama.</h1>
        <p>Panduan praktis dari pendaftaran akun, pencatatan cash dan e-wallet, hingga membaca laporan keuangan bulanan secara real time.</p>
        <div className="guide-hero-actions">
          <a href="#akun" className="button primary">Mulai panduan <ArrowRight size={17} /></a>
          <span>11 langkah · sekitar 8 menit</span>
        </div>
      </div>
      <div className="guide-journey" aria-label="Alur penggunaan RZTrack">
        <div className="guide-journey-head"><span>Alur paling cepat</span><strong>4 tahap utama</strong></div>
        {["Buat akun dan verifikasi email", "Tambahkan cash atau e-wallet", "Catat pemasukan dan pengeluaran", "Baca laporan setiap bulan"].map((item, index) => <div className="guide-journey-item" key={item}><span>{index + 1}</span><p>{item}</p><Check size={16} /></div>)}
      </div>
    </section>

    <div className="guide-docs-layout">
      <aside className="guide-toc">
        <div className="guide-toc-inner">
          <span className="guide-toc-title">DAFTAR ISI</span>
          {chapters.map(chapter => <a href={`#${chapter.id}`} key={chapter.id}><span>{chapter.number}</span>{chapter.title}</a>)}
          <a href="#bantuan"><span>04</span>Bantuan cepat</a>
          <div className="guide-toc-note"><Headphones size={20} /><div><strong>Masih bingung?</strong><p>Mulai dari langkah pertama dan ikuti urutannya.</p></div></div>
        </div>
      </aside>

      <div className="guide-content">
        {chapters.map(chapter => <section className="guide-chapter" id={chapter.id} key={chapter.id}>
          <header className="guide-chapter-head">
            <span>{chapter.number}</span>
            <div><small>{chapter.eyebrow}</small><h2>{chapter.title}</h2><p>{chapter.description}</p></div>
          </header>
          <div className="guide-step-list">
            {steps.filter(step => step.group === chapter.key).map(({ id, icon: Icon, number, title, description, items }) => <article className="guide-v2-step" id={id} key={id}>
              <div className="guide-v2-step-head"><span className="guide-v2-icon"><Icon size={21} /></span><div><small>LANGKAH {number}</small><h3>{title}</h3><p>{description}</p></div></div>
              <ol>{items.map(item => <li key={item}><span><Check size={13} /></span><p>{item}</p></li>)}</ol>
            </article>)}
          </div>
        </section>)}

        <section className="guide-support" id="bantuan">
          <header><span><Lightbulb size={20} /></span><div><small>BANTUAN CEPAT</small><h2>Hal yang perlu diperhatikan</h2></div></header>
          <div className="guide-support-grid">
            <article><strong>Catat secara rutin</strong><p>Masukkan transaksi segera setelah terjadi agar saldo dan grafik selalu akurat.</p></article>
            <article><strong>Periksa periode</strong><p>Pastikan bulan yang dipilih sesuai sebelum membaca laporan atau membuat anggaran.</p></article>
            <article><strong>Gunakan transfer</strong><p>Saat mengisi e-wallet dari rekening, gunakan Transfer agar tidak tercatat sebagai pemasukan palsu.</p></article>
            <article><strong>Email belum masuk</strong><p>Periksa folder Spam atau Promosi dan pastikan alamat email yang digunakan sudah benar.</p></article>
            <article><strong>Data belum berubah</strong><p>Pastikan perangkat terhubung ke internet, kemudian muat ulang halaman satu kali.</p></article>
            <article><strong>Lupa password</strong><p>Pilih Lupa password pada halaman login dan ikuti tautan pemulihan yang dikirim melalui email.</p></article>
          </div>
        </section>

        <section className="guide-v2-cta">
          <div><span>SELESAI MEMBACA?</span><h2>Mulai catat keuangan Anda.</h2><p>Buat akun, tambahkan dompet pertama, lalu catat transaksi hari ini.</p></div>
          <Link href="/register" className="button primary"><PlusCircle size={18} />Buat akun gratis</Link>
        </section>
      </div>
    </div>
  </main>;
}
