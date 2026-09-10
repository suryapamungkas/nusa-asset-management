"use client";

import React from "react";
import { motion } from "framer-motion";
import { Asset } from "@/lib/types";
import { calculateDepreciation, formatRupiah } from "@/lib/assetData";

interface DepreciationTabProps {
  assets: Asset[];
  totalBookValue: number;
}

export function DepreciationTab({ assets, totalBookValue }: DepreciationTabProps) {
  return (
    <motion.div
      key="depreciation"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="nim-card space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Rekapitulasi Depresiasi Finansial (Metode Garis Lurus)
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Formula: (Harga Perolehan - Nilai Sisa) / Total Bulan Masa Manfaat. Standar PSAK 16.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-right">
          <span className="text-[var(--ink-soft)] block text-[11px]">Total Nilai Buku Aktif:</span>
          <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {formatRupiah(totalBookValue)}
          </strong>
        </div>
      </div>

      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Aset</th>
              <th>Nama Aset</th>
              <th>Cabang</th>
              <th>Tgl Beli</th>
              <th>Harga Beli</th>
              <th>Nilai Sisa</th>
              <th>Masa Manfaat</th>
              <th>Penyusutan/Bln</th>
              <th>Akumulasi</th>
              <th>Nilai Buku Terkini</th>
            </tr>
          </thead>
          <tbody>
            {assets
              .filter((a) => a.status !== "Disposed")
              .map((a) => {
                const depr = calculateDepreciation(a.cost, a.salvage, a.life, a.date);
                return (
                  <tr key={a.id}>
                    <td>
                      <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                        {a.id}
                      </span>
                    </td>
                    <td>
                      <strong className="text-xs text-[var(--ink)]">{a.name}</strong>
                    </td>
                    <td>
                      <span className="text-xs">{a.branch}</span>
                    </td>
                    <td>
                      <span className="text-xs font-mono">{a.date}</span>
                    </td>
                    <td>
                      <span className="text-xs">{formatRupiah(a.cost)}</span>
                    </td>
                    <td>
                      <span className="text-xs">{formatRupiah(a.salvage)}</span>
                    </td>
                    <td>
                      <span className="text-xs">{a.life} Tahun</span>
                    </td>
                    <td>
                      <span className="text-xs text-[var(--ink-soft)]">
                        {formatRupiah(depr.monthlyDeprec)}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                        {formatRupiah(depr.accumulatedDeprec)}
                      </span>
                    </td>
                    <td>
                      <strong className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
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
