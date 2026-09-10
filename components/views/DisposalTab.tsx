"use client";

import React from "react";
import { motion } from "framer-motion";
import { DisposalRecord } from "@/lib/types";
import { formatRupiah } from "@/lib/assetData";

interface DisposalTabProps {
  disposals: DisposalRecord[];
}

export function DisposalTab({ disposals }: DisposalTabProps) {
  return (
    <motion.div
      key="disposal"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="nim-card space-y-5"
    >
      <div className="pb-4 border-b border-[var(--line)]">
        <h2 className="text-lg font-extrabold text-[var(--ink)]">
          Riwayat Penghapusan & Scrap Aset (Disposal)
        </h2>
        <p className="text-xs text-[var(--ink-soft)] mt-0.5">
          Pelepasan aset rusak berat, kadaluarsa, atau tidak bernilai ekonomis yang telah disetujui Direksi.
        </p>
      </div>

      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Disposal</th>
              <th>Aset</th>
              <th>Cabang</th>
              <th>Alasan Penghapusan</th>
              <th>Metode</th>
              <th>Nilai Perolehan Scrap</th>
              <th>Pemberi Otorisasi</th>
              <th>Tgl Penghapusan</th>
            </tr>
          </thead>
          <tbody>
            {disposals.map((d) => (
              <tr key={d.id}>
                <td>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {d.id}
                  </span>
                </td>
                <td>
                  <strong className="text-xs block text-[var(--ink)]">
                    {d.assetName}
                  </strong>
                  <span className="text-[11px] font-mono text-[var(--ink-soft)]">
                    {d.assetId}
                  </span>
                </td>
                <td>
                  <span className="text-xs">{d.branch}</span>
                </td>
                <td>
                  <span className="text-xs">{d.reason}</span>
                </td>
                <td>
                  <span className="badge-subtle badge-rose">{d.method}</span>
                </td>
                <td>
                  <span className="text-xs font-bold text-emerald-600">
                    {formatRupiah(d.value)}
                  </span>
                </td>
                <td>
                  <span className="text-xs font-bold">{d.approver}</span>
                </td>
                <td>
                  <span className="text-xs font-mono">{d.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
