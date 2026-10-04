"use client";

import { Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Modal } from "@/components/modal";
import { MonthPicker } from "@/components/month-picker";
import { useFinance } from "@/lib/data-provider";
import { CATEGORIES } from "@/lib/types";
import { inMonth, rupiah } from "@/lib/finance";

export default function BudgetsPage(){
 const {budgets,transactions,selectedMonth,saveBudget,deleteBudget}=useFinance();const[modal,setModal]=useState(false);const rows=budgets.filter(b=>b.month===selectedMonth);
 const submit=async(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const f=new FormData(e.currentTarget);await saveBudget({category:String(f.get("category")),amount:Number(f.get("amount")),month:selectedMonth});setModal(false)};
 return <><div className="page-head"><div><h1>Anggaran bulanan</h1><p>Tetapkan batas pengeluaran untuk setiap kategori.</p></div><div className="page-actions"><MonthPicker/><button className="button primary" onClick={()=>setModal(true)}><Plus size={18}/>Buat anggaran</button></div></div>
 <section className="budget-grid">{rows.map(b=>{const spent=transactions.filter(tx=>tx.type==="expense"&&tx.category===b.category&&inMonth(tx.transaction_date,selectedMonth)).reduce((s,tx)=>s+Number(tx.amount),0);const percent=Math.round(spent/Number(b.amount)*100);return <article className="card budget-card" key={b.id}><header><div><h3>{b.category}</h3><small>Anggaran {selectedMonth}</small></div><button className="icon-button" onClick={()=>deleteBudget(b.id)}><Trash2 size={17}/></button></header><div className="budget-amounts"><span>Terpakai <strong className={percent>100?"over":""}>{rupiah(spent)}</strong></span><span>{Math.min(percent,999)}%</span></div><div className={`progress ${percent>100?"danger":percent>80?"warn":""}`}><span style={{width:`${Math.min(percent,100)}%`}}/></div><small style={{display:"block",marginTop:10}}>dari {rupiah(Number(b.amount))}</small></article>})}</section>{!rows.length&&<div className="card empty">Belum ada anggaran untuk bulan ini.</div>}
 {modal&&<Modal title="Atur anggaran" onClose={()=>setModal(false)}><form className="form" onSubmit={submit}><div className="field"><label>Kategori</label><select name="category">{CATEGORIES.filter(c=>!["Gaji","Bonus"].includes(c)).map(c=><option key={c}>{c}</option>)}</select></div><div className="field"><label>Batas pengeluaran</label><input name="amount" type="number" min="1" placeholder="500000" required/></div><div className="form-actions"><button type="button" className="button secondary" onClick={()=>setModal(false)}>Batal</button><button className="button primary">Simpan anggaran</button></div></form></Modal>}</>;
}
