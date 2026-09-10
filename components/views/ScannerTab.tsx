"use client";

import React from "react";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import { Asset } from "@/lib/types";
import { calculateDepreciation, formatRupiah } from "@/lib/assetData";

interface ScannerTabProps {
  assets: Asset[];
  scanQuery: string;
  setScanQuery: (val: string) => void;
  scannedAsset: Asset | null;
  setScannedAsset: (asset: Asset | null) => void;
  setSelectedAssetDetail: (asset: Asset) => void;
  setDrawerPanel: (panel: "search" | "bag" | "profile" | null) => void;
}

export function ScannerTab({
  assets,
  scanQuery,
  setScanQuery,
  scannedAsset,
  setScannedAsset,
  setSelectedAssetDetail,
  setDrawerPanel
}: ScannerTabProps) {
  return (
    <motion.div
      key="scanner"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="nim-card space-y-6"
    >
      <div className="pb-4 border-b border-[var(--line)]">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Sistem Pelacakan Lapangan
        </span>
        <h2 className="text-lg font-extrabold text-[var(--ink)] mt-0.5">
          Pemindai Cepat QR Code (&lt; 5 Detik)
        </h2>
        <p className="text-xs text-[var(--ink-soft)] mt-0.5">
          Pindai atau pilih kode aset untuk menampilkan status inventaris, penanggung jawab, dan histori pemeliharaan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scanner Mockup & Select */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] text-center space-y-4">
          <div className="relative w-48 h-48 mx-auto rounded-2xl bg-black flex items-center justify-center overflow-hidden border-2 border-sky-500 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/20 to-transparent animate-pulse" />
            <div className="w-36 h-36 border-2 border-dashed border-sky-400/80 rounded-xl flex items-center justify-center">
              <QrCode size={64} className="text-sky-400 animate-pulse" />
            </div>
          </div>

          <div>
            <label className="drawer-form-label">Simulasi Pindai Cepat (Pilih Unit):</label>
            <select
              className="drawer-input text-xs"
              value={scanQuery}
              onChange={(e) => {
                setScanQuery(e.target.value);
                const found = assets.find((a) => a.id === e.target.value);
                setScannedAsset(found || null);
              }}
            >
              <option value="">-- Pilih Kode Aset Terdata --</option>
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} &bull; {a.name} ({a.branch})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scanned Result Card */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {scannedAsset ? (
            <div className="p-6 rounded-2xl bg-[var(--canvas)] border border-[var(--line)] shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    {scannedAsset.id}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--ink)] mt-0.5">
                    {scannedAsset.name}
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)]">
                    {scannedAsset.brand} &bull; SN: {scannedAsset.serial}
                  </p>
                </div>
                <span className="badge-subtle badge-green">
                  {scannedAsset.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[var(--line)]">
                <div>
                  <span className="text-[var(--ink-soft)] block">Penempatan:</span>
                  <strong>{scannedAsset.branch}</strong>
                </div>
                <div>
                  <span className="text-[var(--ink-soft)] block">Custodian:</span>
                  <strong>{scannedAsset.custodian || "Belum Ditugaskan"}</strong>
                </div>
                <div>
                  <span className="text-[var(--ink-soft)] block">Harga Beli:</span>
                  <strong>{formatRupiah(scannedAsset.cost)}</strong>
                </div>
                <div>
                  <span className="text-[var(--ink-soft)] block">Nilai Buku Terkini:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    {formatRupiah(
                      calculateDepreciation(
                        scannedAsset.cost,
                        scannedAsset.salvage,
                        scannedAsset.life,
                        scannedAsset.date
                      ).bookValue
                    )}
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedAssetDetail(scannedAsset)}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition"
                >
                  Buka Modal Detail Lengkap &rarr;
                </button>
                <button
                  onClick={() => setDrawerPanel("bag")}
                  className="px-3 py-1.5 rounded-xl border border-[var(--line)] text-xs font-bold transition"
                >
                  Ajukan Mutasi
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-[var(--ink-soft)] border-2 border-dashed border-[var(--line)] rounded-2xl">
              <QrCode size={42} className="mx-auto mb-2 opacity-50" />
              <p className="font-bold text-sm text-[var(--ink)]">
                Pilih aset pada dropdown untuk simulasi scan
              </p>
              <p className="text-xs mt-1">
                Waktu pencarian instan rata-rata 320 milidetik (&lt; 5 detik).
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
