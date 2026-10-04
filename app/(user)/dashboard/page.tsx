"use client";

import { ArrowDownRight, ArrowLeftRight, ArrowUpRight, Landmark, PiggyBank, Radio } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MonthPicker } from "@/components/month-picker";
import { useFinance } from "@/lib/data-provider";
import { categoryTotals, dailyTotals, monthlySummary, rupiah, shortRupiah, walletBalanceAtMonthEnd } from "@/lib/finance";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#0ea5e9", "#8b5cf6"];

export default function DashboardPage() {
  const { loading, profile, wallets, transactions, budgets, selectedMonth } = useFinance();
  const summary = monthlySummary(transactions, selectedMonth);
  const totalBalance = wallets.reduce((sum, wallet) => sum + walletBalanceAtMonthEnd(wallet, transactions, selectedMonth), 0);
  const categoryData = categoryTotals(transactions, selectedMonth);
  const chartData = dailyTotals(transactions, selectedMonth);
  const budgetTotal = budgets.filter((item) => item.month === selectedMonth).reduce((sum, item) => sum + Number(item.amount), 0);
  const remaining = budgetTotal - summary.expense;
  if (loading) return <div className="card empty">Memuat data keuangan...</div>;
  return <>
    <div className="page-head"><div><h1>Halo, {profile.full_name.split(" ")[0]}</h1><p>Berikut ringkasan keuangan Anda bulan ini.</p></div><div className="page-actions"><span className="online-status"><Radio size={12} />Tersinkron real-time</span><MonthPicker /></div></div>
    <section className="stats-grid">
      <article className="stat-card"><div className="stat-head"><span>Saldo akhir periode</span><span className="stat-icon indigo"><Landmark size={20} /></span></div><h2>{rupiah(totalBalance)}</h2><small>{wallets.length} dompet aktif</small></article>
      <article className="stat-card"><div className="stat-head"><span>Pemasukan</span><span className="stat-icon green"><ArrowUpRight size={20} /></span></div><h2>{rupiah(summary.income)}</h2><small className="positive">Bulan terpilih</small></article>
      <article className="stat-card"><div className="stat-head"><span>Pengeluaran</span><span className="stat-icon red"><ArrowDownRight size={20} /></span></div><h2>{rupiah(summary.expense)}</h2><small className="negative">{summary.income ? Math.round(summary.expense / summary.income * 100) : 0}% dari pemasukan</small></article>
      <article className="stat-card"><div className="stat-head"><span>Sisa anggaran</span><span className="stat-icon amber"><PiggyBank size={20} /></span></div><h2>{rupiah(remaining)}</h2><small className={remaining < 0 ? "negative" : "positive"}>{budgetTotal ? `${Math.round(summary.expense / budgetTotal * 100)}% telah digunakan` : "Belum ada anggaran"}</small></article>
    </section>
    <section className="dashboard-grid">
      <article className="card"><div className="card-head"><h2>Arus kas harian</h2><span className="pill">Real-time</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient><linearGradient id="expense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={.25}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7eaf0"/><XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={11}/><YAxis axisLine={false} tickLine={false} fontSize={11} tickFormatter={shortRupiah}/><Tooltip formatter={(value) => rupiah(Number(value))}/><Area type="monotone" dataKey="pemasukan" stroke="#10b981" fill="url(#income)" strokeWidth={2}/><Area type="monotone" dataKey="pengeluaran" stroke="#ef4444" fill="url(#expense)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div></article>
      <article className="card"><div className="card-head"><h2>Pengeluaran per kategori</h2></div>{categoryData.length ? <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={95} paddingAngle={3}>{categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}</Pie><Tooltip formatter={(value) => rupiah(Number(value))}/></PieChart></ResponsiveContainer></div> : <div className="empty">Belum ada pengeluaran pada bulan ini.</div>}</article>
      <article className="card grid-span-2"><div className="card-head"><h2>Saldo setiap dompet pada akhir periode</h2><a href="/wallets" className="text-link">Kelola dompet</a></div><div className="wallet-strip">{wallets.map((wallet) => <div className="mini-wallet" key={wallet.id}><header><span className="wallet-dot" style={{ background: wallet.color }}/><span>{wallet.name}</span></header><strong>{rupiah(walletBalanceAtMonthEnd(wallet, transactions, selectedMonth))}</strong><small>{wallet.kind === "cash" ? "Uang tunai" : wallet.kind === "bank" ? "Rekening bank" : "E-wallet"}</small></div>)}</div></article>
      <article className="card grid-span-2"><div className="card-head"><h2>Transaksi terbaru</h2><a href="/transactions" className="text-link">Lihat semua</a></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Transaksi</th><th>Dompet</th><th>Tanggal</th><th>Nominal</th></tr></thead><tbody>{summary.rows.slice(0,5).map((tx) => <tr key={tx.id}><td><div className="transaction-name"><span className="tx-icon">{tx.type === "income" ? <ArrowUpRight size={18}/> : tx.type === "expense" ? <ArrowDownRight size={18}/> : <ArrowLeftRight size={18}/>}</span><span><strong>{tx.note || tx.category}</strong><small style={{display:"block"}}>{tx.category}</small></span></div></td><td>{wallets.find((w) => w.id === tx.wallet_id)?.name || "Dompet"}</td><td>{new Intl.DateTimeFormat("id-ID", { day:"numeric", month:"short" }).format(new Date(tx.transaction_date))}</td><td className={`amount ${tx.type}`}>{tx.type === "income" ? "+" : tx.type === "expense" ? "−" : ""}{rupiah(Number(tx.amount))}</td></tr>)}</tbody></table>{!summary.rows.length && <div className="empty">Belum ada transaksi pada bulan ini.</div>}</div></article>
    </section>
  </>;
}
