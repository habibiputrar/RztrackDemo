"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { monthLabel, moveMonth } from "@/lib/finance";
import { useFinance } from "@/lib/data-provider";

export function MonthPicker() {
  const { selectedMonth, setSelectedMonth } = useFinance();
  return <div className="month-picker">
    <button className="icon-button" onClick={() => setSelectedMonth(moveMonth(selectedMonth, -1))} aria-label="Bulan sebelumnya"><ChevronLeft size={18} /></button>
    <strong>{monthLabel(selectedMonth)}</strong>
    <button className="icon-button" onClick={() => setSelectedMonth(moveMonth(selectedMonth, 1))} aria-label="Bulan berikutnya"><ChevronRight size={18} /></button>
  </div>;
}
