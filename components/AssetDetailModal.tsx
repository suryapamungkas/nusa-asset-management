"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, QrCode } from "lucide-react";
import { Asset } from "@/lib/types";
import { formatRupiah, calculateDepreciation, generateSimpleQrSvg } from "@/lib/assetData";

interface AssetDetailModalProps {
  asset: Asset | null;
  onClose: () => void;
}

export function AssetDetailModal({ asset, onClose }: AssetDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"spec" | "finance" | "history">("spec");

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!asset) return null;

  const depr = calculateDepreciation(asset.cost, asset.salvage, asset.life, asset.date);
  const qrSvg = generateSimpleQrSvg(asset.id, 140);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Box */}
        <motion.div
          className="relative w-full max-w-2xl bg-[var(--canvas-card,var(--canvas))] border border-[var(--line)] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-[var(--canvas-soft)]/50">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600">
                <QrCode size={18} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-[var(--ink)]">
                    Detail Aset &amp; Label QR
                  </h3>
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    {asset.id}
                  </span>
                </div>
                <p className="text-xs text-[var(--ink-soft)]">
                  PT Nusa Integra Mandiri &bull; Cabang {asset.branch}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
              aria-label="Tutup modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Subnav Tabs inside Modal */}
          <div className="flex items-center gap-1 px-6 pt-3 border-b border-[var(--line)] bg-[var(--canvas)] text-xs">
            <button
              onClick={() => setActiveTab("spec")}
              className={`pb-2.5 px-3 font-bold border-b-2 transition ${
                activeTab === "spec"
                  ? "border-sky-600 text-sky-600 dark:text-sky-400"
                  : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              Spesifikasi Fisik &amp; QR
            </button>
            <button
              onClick={() => setActiveTab("finance")}
              className={`pb-2.5 px-3 font-bold border-b-2 transition ${
                activeTab === "finance"
                  ? "border-sky-600 text-sky-600 dark:text-sky-400"
                  : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              Depresiasi Finansial (PSAK 16)
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-2.5 px-3 font-bold border-b-2 transition ${
                activeTab === "history"
                  ? "border-sky-600 text-sky-600 dark:text-sky-400"
                  : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              Status Operasional &amp; Servis
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {activeTab === "spec" && (
              <div className="space-y-6">
                {/* Physical Tag Showcase */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)]">
                  {/* QR Box */}
                  <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-black border border-[var(--line)] shadow-sm shrink-0">
                    <div
                      className="text-neutral-900 dark:text-white"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                    <span className="mt-2 text-xs font-mono font-bold text-neutral-900 dark:text-white">
                      {asset.id}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      NIM Enterprise Asset
                    </span>
                  </div>

                  {/* Title & Specs */}
                  <div className="flex-1 text-center sm:text-left space-y-2.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {asset.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Status: {asset.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--canvas)] border border-[var(--line)] text-[var(--ink)]">
                        Kondisi: {asset.condition}
                      </span>
                    </div>

                    <h4 className="text-xl font-extrabold text-[var(--ink)]">
                      {asset.name}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--ink-soft)] pt-1">
                      <div>
                        <span>Merk / Pabrikan: </span>
                        <strong className="text-[var(--ink)] font-semibold">{asset.brand}</strong>
                      </div>
                      <div>
                        <span>Nomor Seri (SN): </span>
                        <strong className="font-mono text-[var(--ink)] font-semibold">{asset.serial}</strong>
                      </div>
                      <div>
                        <span>Lokasi Cabang: </span>
                        <strong className="text-[var(--ink)] font-semibold">{asset.branch}</strong>
                      </div>
                      <div>
                        <span>Penanggung Jawab: </span>
                        <strong className="text-[var(--ink)] font-semibold">{asset.custodian || "Belum Ditugaskan"}</strong>
                      </div>
                      <div>
                        <span>Tgl Perolehan: </span>
                        <strong className="font-mono text-[var(--ink)] font-semibold">{asset.date}</strong>
                      </div>
                      <div>
                        <span>Masa Manfaat: </span>
                        <strong className="text-[var(--ink)] font-semibold">{asset.life} Tahun</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--canvas-soft)] text-xs text-[var(--ink-soft)] flex items-center justify-between">
                  <span>Label fisik dicetak di atas stiker vinyl tahan air dengan lapisan pelindung UV.</span>
                  <button
                    onClick={handlePrint}
                    className="font-bold text-sky-600 hover:underline flex items-center gap-1 shrink-0"
                  >
                    <Printer size={13} /> Cetak Stiker
                  </button>
                </div>
              </div>
            )}

            {activeTab === "finance" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] text-xs">
                  <span className="font-bold text-[var(--ink)]">
                    Perhitungan Depresiasi Garis Lurus (PSAK 16)
                  </span>
                  <span className="text-[var(--ink-soft)] font-mono">
                    {depr.monthsElapsed} Bulan Berjalan
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-center">
                    <span className="text-[11px] text-[var(--ink-soft)] block">Harga Beli Awal</span>
                    <strong className="text-sm font-bold text-[var(--ink)] block mt-0.5 font-mono">
                      {formatRupiah(asset.cost)}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-center">
                    <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold block">Akumulasi Penyusutan</span>
                    <strong className="text-sm font-bold text-rose-600 dark:text-rose-400 block mt-0.5 font-mono">
                      {formatRupiah(depr.accumulatedDeprec)}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">
                      Nilai Buku Terkini
                    </span>
                    <strong className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300 block mt-0.5 font-mono">
                      {formatRupiah(depr.bookValue)}
                    </strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-soft)]">Penyusutan per Bulan:</span>
                    <strong className="font-mono text-[var(--ink)]">{formatRupiah(depr.monthlyDeprec)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-soft)]">Estimasi Nilai Residu (Akhir Masa):</span>
                    <strong className="font-mono text-[var(--ink)]">{formatRupiah(asset.salvage)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-soft)]">Total Masa Manfaat:</span>
                    <strong className="text-[var(--ink)]">{asset.life * 12} Bulan ({asset.life} Tahun)</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--ink)]">Status Logistik &amp; Penempatan</span>
                    <span className="badge-subtle badge-green font-bold">Terverifikasi</span>
                  </div>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    Aset saat ini beroperasi di Kantor {asset.branch} di bawah tanggung jawab resmi {asset.custodian || "Staff Belum Ditugaskan"}. Terakhir diverifikasi saat rekonsiliasi triwulanan.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--ink)]">Kelaikan Servis Preventif</span>
                    <span className="badge-subtle badge-blue font-bold">Jadwal Normal</span>
                  </div>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    Kondisi fisik: {asset.condition}. Unit siap operasional dan terjadwal untuk inspeksi berkala berikutnya sesuai kalender pemeliharaan.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--line)] bg-[var(--canvas-soft)]/50 print:hidden">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 transition shadow-sm"
            >
              <Printer size={14} /> Cetak Stiker Thermal Fisik
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
