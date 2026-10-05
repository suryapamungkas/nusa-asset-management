"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Check,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
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
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [feedbackNotice, setFeedbackNotice] = useState<string>("");

  const filteredTransfers = transfers.filter((t) => {
    if (statusFilter === "ALL") return true;
    if (statusFilter === "PENDING") return t.status === "Pending Manager Approval";
    if (statusFilter === "TRANSIT") return t.status === "In-Transit";
    if (statusFilter === "COMPLETED") return t.status.includes("Selesai");
    return true;
  });

  const onApprove = (id: string, name: string) => {
    handleApproveTransfer(id);
    setFeedbackNotice(`Mutasi ${id} (${name}) telah disetujui! Status beralih ke In-Transit.`);
    setTimeout(() => setFeedbackNotice(""), 4000);
  };

  const onReceive = (id: string, name: string) => {
    handleConfirmReceiveTransfer(id);
    setFeedbackNotice(`Aset ${name} berhasil dikonfirmasi diterima di cabang tujuan!`);
    setTimeout(() => setFeedbackNotice(""), 4000);
  };

  return (
    <motion.div
      key="transfer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="nim-card space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Workflow Mutasi &amp; Distribusi Aset Antar-Cabang
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--canvas-soft)] border border-[var(--line)] text-[var(--ink-soft)]">
              {transfers.length} Riwayat
            </span>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Alur otorisasi berjenjang: Pengajuan &rarr; Persetujuan Manajer &rarr; In-Transit Ekspedisi &rarr; Konfirmasi Diterima di Cabang Tujuan.
          </p>
        </div>

        <button
          onClick={() => setDrawerPanel("bag")}
          className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Plus size={14} /> Ajukan Mutasi Baru
        </button>
      </div>

      {/* Visual Workflow Steps Indicator */}
      <div className="p-4 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <strong className="block text-[var(--ink)] font-bold">1. Pengajuan</strong>
              <span className="text-[10px] text-[var(--ink-soft)]">Input kebutuhan unit</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <strong className="block text-[var(--ink)] font-bold">2. Otorisasi</strong>
              <span className="text-[10px] text-[var(--ink-soft)]">Approval Manajer IT/Ops</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <strong className="block text-[var(--ink)] font-bold">3. In-Transit</strong>
              <span className="text-[10px] text-[var(--ink-soft)]">Pengiriman antar-pulau</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </div>
            <div>
              <strong className="block text-[var(--ink)] font-bold">4. Diterima (BAST)</strong>
              <span className="text-[10px] text-[var(--ink-soft)]">Verifikasi fisik di cabang</span>
            </div>
          </div>
        </div>
      </div>

      {feedbackNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--ink-soft)] font-medium">Filter Status:</span>
        <button
          onClick={() => setStatusFilter("ALL")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            statusFilter === "ALL"
              ? "bg-[var(--ink)] text-[var(--canvas)]"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Semua ({transfers.length})
        </button>
        <button
          onClick={() => setStatusFilter("PENDING")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            statusFilter === "PENDING"
              ? "bg-amber-600 text-white"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Menunggu Otorisasi ({transfers.filter((t) => t.status === "Pending Manager Approval").length})
        </button>
        <button
          onClick={() => setStatusFilter("TRANSIT")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            statusFilter === "TRANSIT"
              ? "bg-purple-600 text-white"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          In-Transit ({transfers.filter((t) => t.status === "In-Transit").length})
        </button>
        <button
          onClick={() => setStatusFilter("COMPLETED")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            statusFilter === "COMPLETED"
              ? "bg-emerald-600 text-white"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Selesai ({transfers.filter((t) => t.status.includes("Selesai")).length})
        </button>
      </div>

      {/* Transfers Data Table */}
      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Mutasi</th>
              <th>Aset &amp; Kode</th>
              <th>Rute Perpindahan</th>
              <th>Custodian Baru</th>
              <th>Alasan Pengajuan</th>
              <th>Tgl Pengajuan</th>
              <th>Status Alur</th>
              <th className="text-center">Aksi Otorisasi</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransfers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-[var(--ink-soft)]">
                  Tidak ditemukan permohonan mutasi untuk filter status ini.
                </td>
              </tr>
            ) : (
              filteredTransfers.map((t) => {
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
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <span>{t.fromBranch}</span>
                        <ArrowRight size={12} className="text-sky-600" />
                        <span className="text-sky-600 dark:text-sky-400">{t.toBranch}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-medium text-[var(--ink)]">
                        {t.newCustodian}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs text-[var(--ink-soft)] max-w-xs truncate block" title={t.reason}>
                        {t.reason || "Kebutuhan operasional"}
                      </span>
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
                          onClick={() => onApprove(t.id, t.assetName)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 mx-auto shadow-sm"
                          title="Setujui permohonan mutasi ini"
                        >
                          <Check size={13} /> Setujui
                        </button>
                      )}
                      {t.status === "In-Transit" && (
                        <button
                          onClick={() => onReceive(t.id, t.assetName)}
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1 mx-auto shadow-sm"
                          title="Konfirmasi bahwa aset telah sampai di cabang tujuan"
                        >
                          <CheckCircle2 size={13} /> Konfirmasi Diterima
                        </button>
                      )}
                      {t.status.includes("Selesai") && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                          <Check size={13} /> Tuntas
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
