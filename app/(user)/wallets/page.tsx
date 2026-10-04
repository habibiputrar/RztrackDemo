"use client";

import { Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Modal } from "@/components/modal";
import { useFinance } from "@/lib/data-provider";
import { rupiah, walletBalance } from "@/lib/finance";
import type { WalletKind } from "@/lib/types";

const kindNames = { cash: "Uang tunai", bank: "Rekening bank", ewallet: "E-wallet" };

export default function WalletsPage() {
  const { wallets, transactions, addWallet, deleteWallet } = useFinance(); const [modal,setModal]=useState(false);
  const submit=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const f=new FormData(event.currentTarget);await addWallet({name:String(f.get("name")),kind:String(f.get("kind")) as WalletKind,initial_balance:Number(f.get("balance")),color:String(f.get("color"))});setModal(false)};
  return <><div className="page-head"><div><h1>Dompet & akun</h1><p>Pisahkan saldo cash, rekening bank, dan e-wallet.</p></div><button className="button primary" onClick={()=>setModal(true)}><Plus size={18}/>Tambah dompet</button></div>
    <section className="wallet-grid">{wallets.map(wallet=><article className="wallet-card" key={wallet.id} style={{background:`linear-gradient(135deg, ${wallet.color}, #111827)`}}><header><span className="wallet-kind">{kindNames[wallet.kind]}</span><button className="icon-button" onClick={()=>{if(confirm("Arsipkan dompet ini? Riwayat transaksi tidak akan dihapus."))deleteWallet(wallet.id)}}><Trash2 size={17}/></button></header><h3>{wallet.name}</h3><div className="balance">{rupiah(walletBalance(wallet,transactions))}</div></article>)}</section>
    {modal&&<Modal title="Tambah dompet" onClose={()=>setModal(false)}><form className="form" onSubmit={submit}><div className="field"><label>Nama dompet</label><input name="name" placeholder="Contoh: DANA atau BCA" required maxLength={50}/></div><div className="field"><label>Jenis</label><select name="kind"><option value="cash">Uang tunai</option><option value="bank">Rekening bank</option><option value="ewallet">E-wallet</option></select></div><div className="field"><label>Saldo awal</label><input name="balance" type="number" min="0" defaultValue="0" required/></div><div className="field"><label>Warna</label><input name="color" type="color" defaultValue="#4f46e5"/></div><div className="form-actions"><button type="button" className="button secondary" onClick={()=>setModal(false)}>Batal</button><button className="button primary">Simpan dompet</button></div></form></Modal>}
  </>;
}
