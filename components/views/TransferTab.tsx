"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Check, CheckCircle2 } from "lucide-react";
import { TransferRequest } from "@/lib/types";

interface TransferTabProps {
  transfers: TransferRequest[];
  handleApproveTransfer: (id: string) => void;
  handleConfirmReceiveTransfer: (id: string) => void;
  setDrawerPanel: (panel: "search" | "bag" | "profile" | null) => void;
}

export function TransferTab({
  transfers,
  handleApproveTransfer,
  handleConfirmReceiveTransfer,
  setDrawerPanel
}: TransferTabProps) {
  return (
    <motion.div
      key="transfer"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="nim-card space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Kelola Mutasi & Perpindahan Aset Antar-Cabang
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Alur persetujuan terstruktur: Pengajuan &rarr; Approval Manajer &rarr; In-Transit &rarr; Konfirmasi Diterima.
          </p>
        </div>
        <button
          onClick={() => setDrawerPanel("bag")}
          className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start"
        >
          <Plus size={14} /> Ajukan Mutasi Baru
        </button>
      </div>

      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Mutasi</th>
              <th>Aset & Kode</th>
              <th>Dari Cabang</th>
              <th>Ke Cabang</th>
              <th>Custodian Baru</th>
              <th>Tgl Pengajuan</th>
              <th>Status</th>
              <th className="text-center">Aksi Otorisasi</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => {
              let statusBadge = "badge-subtle badge-amber";
              if (t.status === "In-Transit") statusBadge = "badge-subtle badge-purple";
              if (t.status.includes("Selesai")) statusBadge = "badge-subtle badge-green";

              return (
                <tr key={t.id}>
                  <td>
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                      {t.id}
                    </span>
                  </td>
                  <td>
                    <strong className="text-xs block text-[var(--ink)]">
                      {t.assetName}
                    </strong>
                    <span className="text-[11px] font-mono text-[var(--ink-soft)]">
                      {t.assetId}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs">{t.fromBranch}</span>
                  </td>
                  <td>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                      {t.toBranch}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs">{t.newCustodian}</span>
                  </td>
                  <td>
                    <span className="text-xs font-mono">{t.date}</span>
                  </td>
                  <td>
                    <span className={statusBadge}>{t.status}</span>
                  </td>
                  <td className="text-center">
                    {t.status === "Pending Manager Approval" && (
                      <button
                        onClick={() => handleApproveTransfer(t.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition flex items-center gap-1 mx-auto"
                      >
                        <Check size={12} /> Setujui
                      </button>
                    )}
                    {t.status === "In-Transit" && (
                      <button
                        onClick={() => handleConfirmReceiveTransfer(t.id)}
                        className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold transition flex items-center gap-1 mx-auto"
                      >
                        <CheckCircle2 size={12} /> Konfirmasi Diterima
                      </button>
                    )}
                    {t.status.includes("Selesai") && (
                      <span className="text-[11px] text-neutral-400">Tuntas</span>
                    )}
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
