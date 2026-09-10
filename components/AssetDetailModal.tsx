"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, QrCode, Shield, Calendar, DollarSign, User, MapPin, Tag } from "lucide-react";
import { Asset } from "@/lib/types";
import { formatRupiah, calculateDepreciation, generateSimpleQrSvg } from "@/lib/assetData";

interface AssetDetailModalProps {
  asset: Asset | null;
  onClose: () => void;
}

export function AssetDetailModal({ asset, onClose }: AssetDetailModalProps) {
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
          className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600">
                <QrCode size={18} />
              </span>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Identifikasi & Label QR Aset
                </h3>
                <p className="text-xs text-neutral-500 font-mono">{asset.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 transition"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
            {/* Top Showcase: QR and Core Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
              {/* QR Box */}
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 shadow-sm shrink-0">
                <div
                  className="text-neutral-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <span className="mt-2 text-xs font-mono font-bold text-neutral-900 dark:text-white">
                  {asset.id}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  PT Nusa Integra Mandiri
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {asset.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Status: {asset.status}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                    Kondisi: {asset.condition}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {asset.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-300 pt-1">
                  <div>
                    <span className="text-neutral-400">Merk / Model: </span>
                    <strong className="font-semibold">{asset.brand}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400">Nomor Seri (SN): </span>
                    <strong className="font-mono font-semibold">{asset.serial}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400">Lokasi Fisik: </span>
                    <strong className="font-semibold">{asset.branch}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400">Penanggung Jawab: </span>
                    <strong className="font-semibold">{asset.custodian || "Belum Ditugaskan"}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400">Tgl Perolehan: </span>
                    <strong className="font-semibold">{asset.date}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400">Masa Manfaat: </span>
                    <strong className="font-semibold">{asset.life} Tahun</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial & Depreciation Calculation */}
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Kalkulasi Depresiasi Finansial (Metode Garis Lurus PSAK 16)
                </h5>
                <span className="text-xs text-neutral-400">
                  {depr.monthsElapsed} Bulan Berjalan
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 text-center">
                  <span className="text-[11px] text-neutral-500 block">Harga Perolehan</span>
                  <strong className="text-sm font-bold text-neutral-900 dark:text-white">
                    {formatRupiah(asset.cost)}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 text-center">
                  <span className="text-[11px] text-rose-500 block">Akumulasi Penyusutan</span>
                  <strong className="text-sm font-bold text-rose-600 dark:text-rose-400">
                    {formatRupiah(depr.accumulatedDeprec)}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block">
                    Nilai Buku Terkini
                  </span>
                  <strong className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    {formatRupiah(depr.bookValue)}
                  </strong>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 leading-relaxed pt-1">
                Depresiasi per bulan: <strong>{formatRupiah(depr.monthlyDeprec)}</strong>.
                Estimasi nilai sisa (salvage value) di akhir masa manfaat: <strong>{formatRupiah(asset.salvage)}</strong>.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 print:hidden">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 transition shadow-sm"
            >
              <Printer size={14} /> Cetak Label Fisik
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
