"use client";

import React from "react";
import { motion } from "framer-motion";
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
  return (
    <motion.div
      key="maintenance"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="nim-card space-y-5"
    >
      <div className="pb-4 border-b border-[var(--line)]">
        <h2 className="text-lg font-extrabold text-[var(--ink)]">
          Jadwal Pemeliharaan & Servis Berkala
        </h2>
        <p className="text-xs text-[var(--ink-soft)] mt-0.5">
          Pemantauan servis preventif untuk menjaga performa unit dan memperpanjang masa manfaat aset.
        </p>
      </div>

      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Servis</th>
              <th>Aset</th>
              <th>Jenis Pemeliharaan</th>
              <th>Frekuensi</th>
              <th>Tgl Servis</th>
              <th>Reminder</th>
              <th>Estimasi Biaya</th>
              <th>Status</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((m) => (
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
                  <span className="text-xs">{m.type}</span>
                </td>
                <td>
                  <span className="text-xs">{m.freq}</span>
                </td>
                <td>
                  <span className="text-xs font-mono font-bold">{m.nextDate}</span>
                </td>
                <td>
                  <span className="badge-subtle badge-amber">{m.reminder}</span>
                </td>
                <td>
                  <span className="text-xs font-bold">{formatRupiah(m.cost)}</span>
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
                      onClick={() => handleCompleteMaintenance(m.id)}
                      className="px-2 py-1 rounded-lg bg-[var(--canvas-soft)] hover:bg-[var(--canvas-muted)] border border-[var(--line)] text-[11px] font-bold transition"
                    >
                      Catat Selesai
                    </button>
                  ) : (
                    <span className="text-xs text-neutral-400">✓ Selesai</span>
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
