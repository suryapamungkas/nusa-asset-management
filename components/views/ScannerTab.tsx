"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Zap,
  Camera,
  CameraOff,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Printer,
  ShieldCheck,
  Building2,
  User,
  DollarSign
} from "lucide-react";
import { Asset } from "@/lib/types";
import { calculateDepreciation, formatRupiah, generateSimpleQrSvg } from "@/lib/assetData";

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
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanSpeedMs, setScanSpeedMs] = useState<number>(280);
  const [notice, setNotice] = useState<string>("");

  const handleSimulateScan = (assetId: string) => {
    setIsScanning(true);
    setNotice("Memindai kode QR fisik...");

    // Simulate realistic optical recognition latency (< 5 seconds)
    const simulatedLatency = Math.floor(Math.random() * 180) + 240; // 240-420ms
    setScanSpeedMs(simulatedLatency);

    setTimeout(() => {
      const found = assets.find((a) => a.id === assetId);
      if (found) {
        setScannedAsset(found);
        setScanQuery(found.id);
        setNotice(`Aset ${found.id} berhasil diidentifikasi dalam ${simulatedLatency}ms!`);
      }
      setIsScanning(false);
      setTimeout(() => setNotice(""), 3500);
    }, simulatedLatency);
  };

  const handlePrintLabel = () => {
    window.print();
  };

  return (
    <motion.div
      key="scanner"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="nim-card space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              SLA Teruji &lt; 5 Detik
            </span>
            <span className="text-xs text-[var(--ink-soft)] font-mono">
              Avg Lookup: {scanSpeedMs}ms
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-[var(--ink)] mt-1">
            Pemindai Cepat Barcode &amp; QR Code Lapangan
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Pindai stiker fisik aset secara langsung menggunakan kamera optik atau simulasi kode untuk audit instan di lokasi.
          </p>
        </div>

        <button
          onClick={() => setIsCameraActive(!isCameraActive)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto ${
            isCameraActive
              ? "bg-[var(--canvas-soft)] border border-[var(--line)] text-[var(--ink)]"
              : "bg-sky-600 text-white"
          }`}
        >
          {isCameraActive ? (
            <>
              <CameraOff size={14} /> Jeda Kamera
            </>
          ) : (
            <>
              <Camera size={14} /> Nyalakan Kamera
            </>
          )}
        </button>
      </div>

      {notice && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Main Scanner Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Viewfinder & Presets (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Viewfinder Mockup */}
          <div className="relative aspect-square max-h-[340px] w-full mx-auto rounded-2xl bg-neutral-950 border-2 border-[var(--line)] overflow-hidden shadow-xl flex items-center justify-center">
            {isCameraActive ? (
              <>
                {/* Background optical pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Laser scan line animation */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38bdf8] z-20"
                  animate={{
                    top: ["15%", "85%", "15%"]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Scanner Target Box */}
                <div className="relative w-48 h-48 border-2 border-dashed border-sky-400/70 rounded-2xl flex flex-col items-center justify-center p-4 z-10 bg-sky-950/20 backdrop-blur-[1px]">
                  {/* Corner Targets */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-sky-400" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-sky-400" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-sky-400" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-sky-400" />

                  <QrCode size={56} className="text-sky-400/90 animate-pulse" />
                  <span className="text-[10px] text-sky-300 font-mono mt-3 uppercase tracking-wider font-bold">
                    {isScanning ? "Membaca Pola..." : "Arahkan ke QR"}
                  </span>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-lg border border-neutral-800 backdrop-blur-sm z-20">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Optik 1080p Siap
                  </span>
                  <span className="font-mono">FPS: 60 &bull; Auto-Focus</span>
                </div>
              </>
            ) : (
              <div className="text-center p-6 text-neutral-400 space-y-2">
                <CameraOff size={36} className="mx-auto opacity-50" />
                <p className="text-xs font-semibold">Sensor Kamera Sedang Dijeda</p>
                <button
                  onClick={() => setIsCameraActive(true)}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold"
                >
                  Aktifkan Kembali
                </button>
              </div>
            )}
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--ink)] block">
              Simulasi Cepat (Pilih Sampel Aset):
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleSimulateScan("AST-JKT-2024-001")}
                className="p-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] hover:border-sky-500 text-left transition"
              >
                <strong className="block text-[var(--ink)]">MacBook Pro M3</strong>
                <span className="text-[10px] font-mono text-[var(--ink-soft)]">AST-JKT-2024-001</span>
              </button>
              <button
                onClick={() => handleSimulateScan("AST-JKT-2023-003")}
                className="p-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] hover:border-sky-500 text-left transition"
              >
                <strong className="block text-[var(--ink)]">Dell Server R750</strong>
                <span className="text-[10px] font-mono text-[var(--ink-soft)]">AST-JKT-2023-003</span>
              </button>
              <button
                onClick={() => handleSimulateScan("AST-JKT-2023-004")}
                className="p-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] hover:border-sky-500 text-left transition"
              >
                <strong className="block text-[var(--ink)]">Toyota Avanza</strong>
                <span className="text-[10px] font-mono text-[var(--ink-soft)]">AST-JKT-2023-004</span>
              </button>
              <button
                onClick={() => handleSimulateScan("AST-SBY-2024-007")}
                className="p-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] hover:border-sky-500 text-left transition"
              >
                <strong className="block text-[var(--ink)]">Dell Latitude SBY</strong>
                <span className="text-[10px] font-mono text-[var(--ink-soft)]">AST-SBY-2024-007</span>
              </button>
            </div>
          </div>

          {/* Dropdown Select Fallback */}
          <div>
            <label className="text-xs font-bold text-[var(--ink-soft)] block mb-1">
              Atau Pilih dari Daftar Lengkap:
            </label>
            <select
              className="drawer-input text-xs"
              value={scanQuery}
              onChange={(e) => {
                if (e.target.value) handleSimulateScan(e.target.value);
              }}
            >
              <option value="">-- Pilih Kode Unit Aset --</option>
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} &bull; {a.name} ({a.branch})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Scanned Asset Cockpit Card (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {scannedAsset ? (
              <motion.div
                key={scannedAsset.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[var(--canvas)] border border-[var(--line)] shadow-sm space-y-5"
              >
                {/* Result Top */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--line)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
                        {scannedAsset.id}
                      </span>
                      <span className="badge-subtle badge-green">
                        {scannedAsset.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[var(--ink)] mt-1">
                      {scannedAsset.name}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                      {scannedAsset.brand} &bull; SN: {scannedAsset.serial} &bull; Kategori: {scannedAsset.category}
                    </p>
                  </div>

                  {/* Micro QR Tag */}
                  <div className="p-2 rounded-xl bg-white dark:bg-black border border-[var(--line)] shrink-0 text-center shadow-sm">
                    <div
                      className="text-neutral-900 dark:text-white"
                      dangerouslySetInnerHTML={{
                        __html: generateSimpleQrSvg(scannedAsset.id, 64)
                      }}
                    />
                  </div>
                </div>

                {/* Specification Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
                    <span className="text-[11px] text-[var(--ink-soft)] block flex items-center gap-1">
                      <Building2 size={12} /> Penempatan:
                    </span>
                    <strong className="text-[var(--ink)] block mt-0.5">{scannedAsset.branch}</strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
                    <span className="text-[11px] text-[var(--ink-soft)] block flex items-center gap-1">
                      <User size={12} /> Custodian:
                    </span>
                    <strong className="text-[var(--ink)] block mt-0.5 truncate">
                      {scannedAsset.custodian || "Belum Ditugaskan"}
                    </strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
                    <span className="text-[11px] text-[var(--ink-soft)] block flex items-center gap-1">
                      <ShieldCheck size={12} /> Kondisi Fisik:
                    </span>
                    <strong className="text-emerald-600 dark:text-emerald-400 block mt-0.5">
                      {scannedAsset.condition} (100% Layak)
                    </strong>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
                    <span className="text-[11px] text-[var(--ink-soft)] block">Harga Perolehan:</span>
                    <span className="font-mono font-semibold text-[var(--ink)] block mt-0.5">
                      {formatRupiah(scannedAsset.cost)}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
                    <span className="text-[11px] text-[var(--ink-soft)] block">Nilai Buku Terkini:</span>
                    <strong className="font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">
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

                  <div className="p-2.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
                    <span className="text-[11px] text-[var(--ink-soft)] block">Tgl Perolehan:</span>
                    <span className="font-mono text-[var(--ink)] block mt-0.5">
                      {scannedAsset.date}
                    </span>
                  </div>
                </div>

                {/* Audit Performance Benchmark */}
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Clock size={14} className="text-sky-600" />
                    Kecepatan Audit Optik: <strong>{scanSpeedMs} ms</strong>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    LULUS SLA (&lt; 5 Detik)
                  </span>
                </div>

                {/* Cockpit Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedAssetDetail(scannedAsset)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                  >
                    Buka Spesifikasi Lengkap &rarr;
                  </button>
                  <button
                    onClick={() => setDrawerPanel("bag")}
                    className="px-3.5 py-2 rounded-xl border border-[var(--line)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} /> Ajukan Mutasi Unit
                  </button>
                  <button
                    onClick={handlePrintLabel}
                    className="px-3.5 py-2 rounded-xl border border-[var(--line)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5"
                    title="Cetak Stiker Label Fisik"
                  >
                    <Printer size={13} /> Cetak Label Fisik
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Awaiting Scan State */
              <div className="p-12 text-center border-2 border-dashed border-[var(--line)] rounded-2xl space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[var(--canvas-soft)] mx-auto flex items-center justify-center text-[var(--ink-soft)]">
                  <QrCode size={28} />
                </div>
                <h3 className="text-base font-bold text-[var(--ink)]">
                  Siap Memindai Label Fisik
                </h3>
                <p className="text-xs text-[var(--ink-soft)] max-w-sm mx-auto">
                  Arahkan sensor kamera pada label QR fisik atau klik salah satu tombol sampel di samping kiri untuk menguji respons sistem.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleSimulateScan("AST-JKT-2024-001")}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition"
                  >
                    ⚡ Uji Pindai MacBook Pro (Instan)
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
