import type { Transaction, Wallet } from "./types";

export const rupiah = (value: number) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(value || 0);

export const shortRupiah = (value: number) => {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${value < 0 ? "-" : ""}Rp${(abs / 1_000_000_000).toFixed(1)} M`;
  if (abs >= 1_000_000) return `${value < 0 ? "-" : ""}Rp${(abs / 1_000_000).toFixed(1)} jt`;
  if (abs >= 1_000) return `${value < 0 ? "-" : ""}Rp${(abs / 1_000).toFixed(0)} rb`;
  return rupiah(value);
};

export const monthKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const monthLabel = (key: string) => {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
};

export const moveMonth = (key: string, amount: number) => {
  const [year, month] = key.split("-").map(Number);
  return monthKey(new Date(year, month - 1 + amount, 1));
};

export const inMonth = (date: string, month: string) => date.slice(0, 7) === month;

export function walletBalance(wallet: Wallet, transactions: Transaction[]) {
  return transactions.reduce((balance, tx) => {
    if (tx.type === "income" && tx.wallet_id === wallet.id) return balance + Number(tx.amount);
    if (tx.type === "expense" && tx.wallet_id === wallet.id) return balance - Number(tx.amount);
    if (tx.type === "transfer") {
      if (tx.wallet_id === wallet.id) balance -= Number(tx.amount);
      if (tx.destination_wallet_id === wallet.id) balance += Number(tx.amount);
    }
    return balance;
  }, Number(wallet.initial_balance));
}

export function walletBalanceAtMonthEnd(wallet: Wallet, transactions: Transaction[], month: string) {
  return walletBalance(wallet, transactions.filter((tx) => tx.transaction_date.slice(0, 7) <= month));
}

export function monthlySummary(transactions: Transaction[], month: string) {
  const rows = transactions.filter((tx) => inMonth(tx.transaction_date, month));
  const income = rows.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + Number(tx.amount), 0);
  const expense = rows.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + Number(tx.amount), 0);
  return { rows, income, expense, net: income - expense };
}

export function categoryTotals(transactions: Transaction[], month: string) {
  const result = new Map<string, number>();
  transactions.filter((tx) => tx.type === "expense" && inMonth(tx.transaction_date, month))
    .forEach((tx) => result.set(tx.category, (result.get(tx.category) || 0) + Number(tx.amount)));
  return [...result].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

export function dailyTotals(transactions: Transaction[], month: string) {
  const [year, m] = month.split("-").map(Number);
  const days = new Date(year, m, 0).getDate();
  return Array.from({ length: days }, (_, index) => {
    const day = index + 1;
    const rows = transactions.filter((tx) => inMonth(tx.transaction_date, month) && Number(tx.transaction_date.slice(8, 10)) === day);
    return {
      day: String(day),
      pemasukan: rows.filter((tx) => tx.type === "income").reduce((s, tx) => s + Number(tx.amount), 0),
      pengeluaran: rows.filter((tx) => tx.type === "expense").reduce((s, tx) => s + Number(tx.amount), 0)
    };
  });
}
