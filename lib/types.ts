export type WalletKind = "cash" | "bank" | "ewallet";
export type TransactionType = "income" | "expense" | "transfer";

export interface Profile {
  id: string;
  full_name: string;
  email?: string;
  avatar_url?: string | null;
  role: "user" | "admin";
  is_active: boolean;
}

export interface Wallet {
  id: string;
  user_id: string;
  name: string;
  kind: WalletKind;
  initial_balance: number;
  color: string;
  is_archived?: boolean;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  wallet_id: string;
  destination_wallet_id?: string | null;
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
  transaction_date: string;
  created_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  month: string;
}

export interface Goal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline?: string | null;
  color: string;
}

export const CATEGORIES = [
  "Gaji", "Bonus", "Makanan", "Transportasi", "Belanja", "Tagihan",
  "Hiburan", "Kesehatan", "Pendidikan", "Tabungan", "Lainnya"
] as const;
