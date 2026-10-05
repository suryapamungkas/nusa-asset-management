"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Download,
  Sliders
} from "lucide-react";
import { Asset } from "@/lib/types";
import { calculateDepreciation, formatRupiah } from "@/lib/assetData";

interface DepreciationTabProps {
  assets: Asset[];
  totalBookValue: number;
}

export function DepreciationTab({ assets, totalBookValue }: DepreciationTabProps) {
  // What-if simulator state
  const [simCost, setSimCost] = useState<number>(30000000);
  const [simLifeYears, setSimLifeYears] = useState<number>(4);
  const [simSalvagePercent, setSimSalvagePercent] = useState<number>(10);

  // Compute what-if simulation
  const simSalvage = Math.round((simCost * simSalvagePercent) / 100);
  const simDepreciable = Math.max(0, simCost - simSalvage);
  const simMonthly = Math.round(simDepreciable / (simLifeYears * 12));
  const simAnnual = simMonthly * 12;

  // Active assets total metrics
  const activeAssets = assets.filter((a) => a.status !== "Disposed");
  const totalCost = activeAssets.reduce((acc, a) => acc + a.cost, 0);
  const totalAccumulated = totalCost - totalBookValue;
  const deprRatio = totalCost > 0 ? ((totalAccumulated / totalCost) * 100).toFixed(1) : "0";

  const exportDepreciationCsv = () => {
    let csv =
      "Kode Aset,Nama Aset,Cabang,Tgl Perolehan,Harga Beli (Rp),Nilai Residu (Rp),Masa Manfaat (Thn),Penyusutan per Bulan (Rp),Akumulasi Penyusutan (Rp),Nilai Buku Terkini (Rp)\n";
    activeAssets.forEach((a) => {
      const depr = calculateDepreciation(a.cost, a.salvage, a.life, a.date);
      csv += `"${a.id}","${a.name}","${a.branch}","${a.date}",${a.cost},${a.salvage},${a.life},${depr.monthlyDeprec},${depr.accumulatedDeprec},${depr.bookValue}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Jadwal_Depresiasi_Aset_PSAK16.csv";
    link.click();
  };

  return (
    <motion.div
      key="depreciation"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="nim-card space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Standar Akuntansi PSAK 16
            </span>
            <span className="text-xs text-[var(--ink-soft)]">
              Metode Garis Lurus (Straight-Line)
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-[var(--ink)] mt-1">
            Rekapitulasi Depresiasi &amp; Valuasi Nilai Buku
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Formula: (Harga Perolehan - Nilai Sisa) / Total Bulan Masa Manfaat. Terhitung otomatis setiap bulan berjalan.
          </p>
        </div>

        <button
          onClick={exportDepreciationCsv}
          className="px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Download size={14} /> Unduh Jadwal Depresiasi (CSV)
        </button>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
          <span className="text-[11px] text-[var(--ink-soft)] block">Total Harga Perolehan:</span>
          <strong className="text-base font-extrabold text-[var(--ink)] block mt-0.5 font-mono">
            {formatRupiah(totalCost)}
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-rose-500 border-[var(--line)]">
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-bold block">Akumulasi Penyusutan:</span>
          <strong className="text-base font-extrabold text-rose-600 dark:text-rose-400 block mt-0.5 font-mono">
            {formatRupiah(totalAccumulated)}
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-emerald-500 border-[var(--line)]">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">Nilai Buku Aktif (NBV):</span>
          <strong className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5 font-mono">
            {formatRupiah(totalBookValue)}
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-sky-500 border-[var(--line)]">
          <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold block">Rasio Penyusutan Aset:</span>
          <strong className="text-base font-extrabold text-sky-600 dark:text-sky-400 block mt-0.5">
            {deprRatio}% <span className="text-xs font-normal text-[var(--ink-soft)]">dari perolehan</span>
          </strong>
        </div>
      </div>

      {/* Interactive What-If Scenario Simulator */}
      <div className="p-5 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Sliders className="text-sky-600" size={17} />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink)]">
              Simulasi &ldquo;What-If&rdquo; Depresiasi Finansial Interaktif
            </h3>
          </div>
          <span className="text-[11px] text-[var(--ink-soft)] font-medium">
            Ubah parameter untuk melihat beban bulanan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          {/* Slider 1: Harga Beli */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-[var(--ink-soft)]">Harga Perolehan Aset:</span>
              <span className="font-mono text-sky-600">{formatRupiah(simCost)}</span>
            </div>
            <input
              type="range"
              min={5000000}
              max={100000000}
              step={1000000}
              value={simCost}
              onChange={(e) => setSimCost(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-soft)]">
              <span>Rp 5 Juta</span>
              <span>Rp 100 Juta</span>
            </div>
          </div>

          {/* Slider 2: Masa Manfaat */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-[var(--ink-soft)]">Masa Manfaat (Umur Ekonomis):</span>
              <span className="font-mono text-sky-600">{simLifeYears} Tahun ({simLifeYears * 12} Bln)</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={simLifeYears}
              onChange={(e) => setSimLifeYears(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-soft)]">
              <span>1 Tahun</span>
              <span>10 Tahun</span>
            </div>
          </div>

          {/* Slider 3: Nilai Residu % */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-[var(--ink-soft)]">Nilai Residu (Sisa Akhir):</span>
              <span className="font-mono text-sky-600">{simSalvagePercent}% ({formatRupiah(simSalvage)})</span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              step={1}
              value={simSalvagePercent}
              onChange={(e) => setSimSalvagePercent(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-soft)]">
              <span>0% (Habis)</span>
              <span>25%</span>
            </div>
          </div>
        </div>

        {/* Output Box */}
        <div className="p-3.5 rounded-xl bg-[var(--canvas)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[var(--ink-soft)] block text-[11px]">Hasil Kalkulasi PSAK 16:</span>
            <span className="font-bold text-[var(--ink)]">
              Beban Penyusutan per Bulan: <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{formatRupiah(simMonthly)}</strong>
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[var(--ink-soft)] block">Beban per Tahun:</span>
            <strong className="font-mono font-bold text-sky-600 dark:text-sky-400">
              {formatRupiah(simAnnual)} / tahun
            </strong>
          </div>
        </div>
      </div>

      {/* Depreciation Schedule Table */}
      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Aset</th>
              <th>Nama Aset</th>
              <th>Cabang</th>
              <th>Tgl Perolehan</th>
              <th>Harga Perolehan</th>
              <th>Nilai Sisa</th>
              <th>Masa Manfaat</th>
              <th>Penyusutan/Bln</th>
              <th>Akumulasi</th>
              <th>Nilai Buku Terkini</th>
            </tr>
          </thead>
          <tbody>
            {activeAssets.map((a) => {
              const depr = calculateDepreciation(a.cost, a.salvage, a.life, a.date);
              return (
                <tr key={a.id}>
                  <td>
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                      {a.id}
                    </span>
                  </td>
                  <td>
                    <strong className="text-xs text-[var(--ink)] block">{a.name}</strong>
                    <span className="text-[11px] text-[var(--ink-soft)] font-mono">SN: {a.serial}</span>
                  </td>
                  <td>
                    <span className="text-xs">{a.branch}</span>
                  </td>
                  <td>
                    <span className="text-xs font-mono">{a.date}</span>
                  </td>
                  <td>
                    <span className="text-xs font-mono">{formatRupiah(a.cost)}</span>
                  </td>
                  <td>
                    <span className="text-xs font-mono text-[var(--ink-soft)]">
                      {formatRupiah(a.salvage)}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs">{a.life} Tahun</span>
                  </td>
                  <td>
                    <span className="text-xs font-mono text-[var(--ink-soft)]">
                      {formatRupiah(depr.monthlyDeprec)}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs font-mono font-semibold text-rose-600 dark:text-rose-400">
                      {formatRupiah(depr.accumulatedDeprec)}
                    </span>
                  </td>
                  <td>
                    <strong className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatRupiah(depr.bookValue)}
                    </strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
