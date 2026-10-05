"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Check } from "lucide-react";
import { MaintenanceRecord } from "@/lib/types";
import { formatRupiah } from "@/lib/assetData";

interface MaintenanceTabProps {
  maintenances: MaintenanceRecord[];
  handleCompleteMaintenance: (id: string) => void;
}

export function MaintenanceTab({
  maintenances,
  handleCompleteMaintenance
}: MaintenanceTabProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [notice, setNotice] = useState<string>("");

  const filtered = maintenances.filter((m) => {
    if (filter === "ALL") return true;
    if (filter === "URGENT") return m.reminder.includes("H-") || m.status === "Dalam Pengerjaan";
    if (filter === "IN_PROGRESS") return m.status === "Dalam Pengerjaan";
    if (filter === "COMPLETED") return m.status === "Selesai";
    return true;
  });

  const totalEstCost = maintenances.reduce((acc, m) => acc + m.cost, 0);
  const urgentCount = maintenances.filter((m) => m.reminder.includes("H-") && m.status !== "Selesai").length;

  const onComplete = (id: string, assetName: string) => {
    handleCompleteMaintenance(id);
    setNotice(`Servis untuk ${assetName} (${id}) berhasil dicatat selesai! Riwayat diperbarui.`);
    setTimeout(() => setNotice(""), 4000);
  };

  return (
    <motion.div
      key="maintenance"
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
              Jadwal Pemeliharaan &amp; Servis Berkala Preventif
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {urgentCount} Perlu Perhatian
            </span>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Monitoring kalender servis berkala mesin, armada operasional, dan infrastruktur IT untuk mencegah kerusakan mendadak.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-[var(--ink-soft)] block">Total Estimasi Biaya Servis:</span>
          <strong className="text-sm font-extrabold text-[var(--ink)] font-mono">
            {formatRupiah(totalEstCost)}
          </strong>
        </div>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
          <span className="text-[11px] text-[var(--ink-soft)] block">Total Jadwal Servis:</span>
          <strong className="text-lg font-extrabold text-[var(--ink)] block mt-0.5">
            {maintenances.length} Jadwal
          </strong>
        </div>

        <div className="p-3 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-amber-500 border-[var(--line)]">
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold block">Reminder H-3 &amp; H-7:</span>
          <strong className="text-lg font-extrabold text-amber-600 dark:text-amber-400 block mt-0.5">
            {urgentCount} Unit
          </strong>
        </div>

        <div className="p-3 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-sky-500 border-[var(--line)]">
          <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold block">Dalam Pengerjaan:</span>
          <strong className="text-lg font-extrabold text-sky-600 dark:text-sky-400 block mt-0.5">
            {maintenances.filter((m) => m.status === "Dalam Pengerjaan").length} Unit
          </strong>
        </div>

        <div className="p-3 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-emerald-500 border-[var(--line)]">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">Servis Tuntas:</span>
          <strong className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5">
            {maintenances.filter((m) => m.status === "Selesai").length} Unit
          </strong>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--ink-soft)] font-medium">Filter:</span>
        <button
          onClick={() => setFilter("ALL")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            filter === "ALL"
              ? "bg-[var(--ink)] text-[var(--canvas)]"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Semua ({maintenances.length})
        </button>
        <button
          onClick={() => setFilter("URGENT")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            filter === "URGENT"
              ? "bg-amber-600 text-white"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Perlu Tindakan ({urgentCount})
        </button>
        <button
          onClick={() => setFilter("COMPLETED")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            filter === "COMPLETED"
              ? "bg-emerald-600 text-white"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Selesai ({maintenances.filter((m) => m.status === "Selesai").length})
        </button>
      </div>

      {/* Maintenance Table */}
      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Servis</th>
              <th>Aset &amp; Kode</th>
              <th>Jenis Pemeliharaan</th>
              <th>Frekuensi</th>
              <th>Tgl Servis</th>
              <th>Reminder Urgensi</th>
              <th>Estimasi Biaya</th>
              <th>Status</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id}>
                <td>
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                    {m.id}
                  </span>
                </td>
                <td>
                  <strong className="text-xs block text-[var(--ink)]">
                    {m.assetName}
                  </strong>
                  <span className="text-[11px] font-mono text-[var(--ink-soft)]">
                    {m.assetId}
                  </span>
                </td>
                <td>
                  <span className="text-xs font-medium">{m.type}</span>
                </td>
                <td>
                  <span className="text-xs">{m.freq}</span>
                </td>
                <td>
                  <span className="text-xs font-mono font-bold">{m.nextDate}</span>
                </td>
                <td>
                  <span
                    className={`badge-subtle ${
                      m.reminder.includes("H-3")
                        ? "badge-rose font-bold"
                        : m.reminder.includes("H-7")
                        ? "badge-amber font-bold"
                        : "badge-blue"
                    }`}
                  >
                    {m.reminder}
                  </span>
                </td>
                <td>
                  <span className="text-xs font-mono font-bold">{formatRupiah(m.cost)}</span>
                </td>
                <td>
                  <span
                    className={`badge-subtle ${
                      m.status === "Selesai"
                        ? "badge-green"
                        : m.status === "Dalam Pengerjaan"
                        ? "badge-amber"
                        : "badge-blue"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="text-center">
                  {m.status !== "Selesai" ? (
                    <button
                      onClick={() => onComplete(m.id, m.assetName)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 mx-auto shadow-sm"
                      title="Catat pemeliharaan selesai dilakukan"
                    >
                      <Check size={12} /> Catat Selesai
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 size={13} /> Servis Tuntas
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
