"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  CheckCircle2,
  X
} from "lucide-react";
import { DisposalRecord, BranchLocation } from "@/lib/types";
import { formatRupiah } from "@/lib/assetData";

interface DisposalTabProps {
  disposals: DisposalRecord[];
}

export function DisposalTab({ disposals: initialDisposals }: DisposalTabProps) {
  const [disposalList, setDisposalList] = useState<DisposalRecord[]>(initialDisposals);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>("");

  // Form state
  const [assetId, setAssetId] = useState<string>("AST-JKT-2022-099");
  const [assetName, setAssetName] = useState<string>("Printer Epson L3110 (Mati Total)");
  const [branch, setBranch] = useState<BranchLocation>("Jakarta");
  const [reason, setReason] = useState<string>("Mainboard terbakar dan head printer rusak permanen");
  const [method, setMethod] = useState<DisposalRecord["method"]>("Scrap (Lelang Rongsok)");
  const [scrapValue, setScrapValue] = useState<number>(350000);
  const [approver, setApprover] = useState<string>("Budi Santoso (Manajer Operasional)");

  const totalRecoveryValue = disposalList.reduce((acc, d) => acc + d.value, 0);

  const handleSubmitDisposal = (e: React.FormEvent) => {
    e.preventDefault();
    const nextSeq = String(disposalList.length + 1).padStart(3, "0");
    const newRecord: DisposalRecord = {
      id: `DSP-2026-${nextSeq}`,
      assetId,
      assetName,
      branch,
      reason,
      method,
      value: scrapValue,
      approver,
      date: new Date().toISOString().split("T")[0]
    };

    setDisposalList([newRecord, ...disposalList]);
    setIsModalOpen(false);
    setNotice(`Penghapusan unit ${assetName} (${newRecord.id}) berhasil dicatat dengan persetujuan resmi!`);
    setTimeout(() => setNotice(""), 4500);
  };

  return (
    <motion.div
      key="disposal"
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
              Riwayat Pelepasan &amp; Penghapusan Aset (Disposal &amp; Scrap)
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              {disposalList.length} Unit Dihapus
            </span>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Pencatatan resmi pelepasan aset rusak berat, usang, atau tidak bernilai ekonomis yang telah disetujui Manajer Operasional dan Direksi.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
        >
          <Plus size={14} /> Ajukan Pelepasan Aset
        </button>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
          <span className="text-[11px] text-[var(--ink-soft)] block">Total Unit Dihapuskan:</span>
          <strong className="text-base font-extrabold text-[var(--ink)] block mt-0.5">
            {disposalList.length} Unit
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-emerald-500 border-[var(--line)]">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">
            Total Recovery Kas Scrap:
          </span>
          <strong className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5 font-mono">
            {formatRupiah(totalRecoveryValue)}
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-l-4 border-l-purple-500 border-[var(--line)]">
          <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold block">
            Kepatuhan Prosedur Audit:
          </span>
          <strong className="text-base font-extrabold text-[var(--ink)] block mt-0.5">
            100% Berita Acara Sah
          </strong>
        </div>
      </div>

      {/* Table */}
      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Disposal</th>
              <th>Aset &amp; Kode</th>
              <th>Cabang</th>
              <th>Alasan Pelepasan</th>
              <th>Metode Pelepasan</th>
              <th>Nilai Recovery Scrap</th>
              <th>Pejabat Otorisasi</th>
              <th>Tgl Pelepasan</th>
            </tr>
          </thead>
          <tbody>
            {disposalList.map((d) => (
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
                  <span className="text-xs text-[var(--ink-soft)]">{d.reason}</span>
                </td>
                <td>
                  <span className="badge-subtle badge-rose">{d.method}</span>
                </td>
                <td>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatRupiah(d.value)}
                  </span>
                </td>
                <td>
                  <span className="text-xs font-medium text-[var(--ink)]">{d.approver}</span>
                </td>
                <td>
                  <span className="text-xs font-mono">{d.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Modal: Ajukan Pelepasan Aset */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              className="relative w-full max-w-lg bg-[var(--canvas-card,var(--canvas))] border border-[var(--line)] rounded-2xl shadow-2xl p-6 z-10 space-y-4"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <Trash2 className="text-rose-600" size={18} />
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    Formulir Berita Acara Pelepasan Aset
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmitDisposal} className="space-y-3.5 text-xs">
                <div>
                  <label className="drawer-form-label">Nama Aset &amp; Deskripsi Kerusakan *</label>
                  <input
                    type="text"
                    className="drawer-input text-xs"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="drawer-form-label">Kode Aset Terdaftar *</label>
                    <input
                      type="text"
                      className="drawer-input text-xs font-mono"
                      value={assetId}
                      onChange={(e) => setAssetId(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="drawer-form-label">Lokasi Cabang *</label>
                    <select
                      className="drawer-input text-xs"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value as BranchLocation)}
                      required
                    >
                      <option value="Jakarta">Jakarta</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Medan">Medan</option>
                      <option value="Makassar">Makassar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="drawer-form-label">Alasan Pelepasan / Kerusakan Fisik *</label>
                  <textarea
                    rows={2}
                    className="drawer-input text-xs"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="drawer-form-label">Metode Pelepasan *</label>
                    <select
                      className="drawer-input text-xs"
                      value={method}
                      onChange={(e) => setMethod(e.target.value as any)}
                      required
                    >
                      <option value="Scrap (Lelang Rongsok)">Scrap (Lelang Rongsok)</option>
                      <option value="Penjualan / Lelang Karyawan">Penjualan / Lelang Karyawan</option>
                      <option value="Hibah / Donasi">Hibah / Donasi</option>
                      <option value="Daur Ulang">Daur Ulang Limbah Elektronik</option>
                    </select>
                  </div>
                  <div>
                    <label className="drawer-form-label">Nilai Recovery Kas (Rp) *</label>
                    <input
                      type="number"
                      className="drawer-input text-xs font-mono"
                      value={scrapValue}
                      onChange={(e) => setScrapValue(Number(e.target.value))}
                      min={0}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="drawer-form-label">Pejabat Otorisasi (Approval) *</label>
                  <input
                    type="text"
                    className="drawer-input text-xs"
                    value={approver}
                    onChange={(e) => setApprover(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm"
                  >
                    Simpan Berita Acara Scrap
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
