"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Download,
  Plus,
  QrCode,
  RefreshCw,
  TrendingUp,
  Layers,
  Laptop,
  Car,
  Network,
  Printer as PrintIcon,
  Armchair
} from "lucide-react";

interface DashboardTabProps {
  exportCsv: () => void;
  setActiveAppTab: (tab: "dashboard" | "inventory" | "register" | "scanner" | "transfer" | "maintenance" | "depreciation" | "disposal" | "uat-runner") => void;
  pendingTransfersCount: number;
}

export function DashboardTab({
  exportCsv,
  setActiveAppTab,
  pendingTransfersCount
}: DashboardTabProps) {
  return (
    <motion.div
      key="dashboard"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Ringkasan Eksekutif &bull; Real-Time Data
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] mt-0.5">
            Dashboard Manajemen Aset Fisik
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1">
            Monitoring 524 unit aset, valuasi finansial, mutasi cabang, dan jadwal servis berkala.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Unduh CSV
          </button>
          <button
            onClick={() => setActiveAppTab("register")}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={14} /> Aset Baru
          </button>
        </div>
      </div>

      {/* Bento Grid: 5 Top Metric Cards */}
      <div className="nim-metric-grid">
        <div className="nim-card">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
            Total Aset Terdata
          </span>
          <div className="text-2xl font-extrabold text-[var(--ink)] mt-2">
            524 <span className="text-xs font-normal text-[var(--ink-soft)]">Unit</span>
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1 flex items-center gap-1">
            <Building2 size={12} className="text-sky-600" /> 1 Pusat &bull; 3 Cabang
          </p>
        </div>

        <div className="nim-card border-l-4 border-l-emerald-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Valuasi Nilai Buku
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            Rp 3,21 M
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1">
            Perolehan: Rp 4,85 M
          </p>
        </div>

        <div className="nim-card border-l-4 border-l-sky-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Aset Aktif / Custodian
          </span>
          <div className="text-2xl font-extrabold text-[var(--ink)] mt-2">
            482 <span className="text-xs font-normal text-emerald-600 font-semibold">(92%)</span>
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1">
            Terhubung penanggung jawab
          </p>
        </div>

        <div className="nim-card border-l-4 border-l-amber-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Dalam Servis / Maint
          </span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            28 <span className="text-xs font-normal text-[var(--ink-soft)]">(5%)</span>
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1">
            6 Butuh Perhatian Segera
          </p>
        </div>

        <div className="nim-card border-l-4 border-l-rose-500">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Pending Mutasi
          </span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-2">
            {pendingTransfersCount} <span className="text-xs font-normal text-[var(--ink-soft)]">Req</span>
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1">
            Menunggu Approval Manajer
          </p>
        </div>
      </div>

      {/* Two-Column Bento Layout: Regional Distribution & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Regional Distribution (7 Cols) */}
        <div className="lg:col-span-7 nim-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <Building2 className="text-sky-600" size={18} />
              <h3 className="text-sm font-extrabold text-[var(--ink)]">
                Distribusi Aset Berdasarkan Kantor Cabang
              </h3>
            </div>
            <span className="badge-subtle badge-blue">4 Lokasi</span>
          </div>

          <div className="space-y-3.5 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Kantor Pusat (Jakarta)</span>
                <span className="text-sky-600">242 Unit (46.2%)</span>
              </div>
              <div className="h-2.5 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "46.2%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Cabang Surabaya</span>
                <span className="text-sky-600">118 Unit (22.5%)</span>
              </div>
              <div className="h-2.5 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: "22.5%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Cabang Medan</span>
                <span className="text-emerald-600">94 Unit (17.9%)</span>
              </div>
              <div className="h-2.5 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "17.9%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Cabang Makassar</span>
                <span className="text-amber-600">70 Unit (13.4%)</span>
              </div>
              <div className="h-2.5 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "13.4%" }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] flex items-center justify-between text-xs mt-3">
            <span className="text-[var(--ink-soft)]">
              Seluruh unit telah dilabeli QR Code fisik tahan air & cuaca.
            </span>
            <button
              onClick={() => setActiveAppTab("scanner")}
              className="font-bold text-sky-600 hover:underline flex items-center gap-1"
            >
              Buka Scanner &rarr;
            </button>
          </div>
        </div>

        {/* Right: Category Breakdown (5 Cols) */}
        <div className="lg:col-span-5 nim-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <Layers className="text-indigo-600" size={18} />
              <h3 className="text-sm font-extrabold text-[var(--ink)]">
                Komposisi 5 Kategori Aset
              </h3>
            </div>
            <span className="badge-subtle badge-purple">Fisik</span>
          </div>

          <div className="space-y-2.5 text-xs pt-1">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--canvas-soft)] transition">
              <div className="flex items-center gap-2">
                <Laptop size={15} className="text-sky-600" />
                <span>IT Hardware & Komputer</span>
              </div>
              <strong className="font-bold">215 Unit</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--canvas-soft)] transition">
              <div className="flex items-center gap-2">
                <Car size={15} className="text-emerald-600" />
                <span>Kendaraan Operasional & Kurir</span>
              </div>
              <strong className="font-bold">42 Unit</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--canvas-soft)] transition">
              <div className="flex items-center gap-2">
                <Network size={15} className="text-blue-600" />
                <span>Perangkat Jaringan & Server</span>
              </div>
              <strong className="font-bold">68 Unit</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--canvas-soft)] transition">
              <div className="flex items-center gap-2">
                <PrintIcon size={15} className="text-amber-600" />
                <span>Mesin & Percetakan Dokumen</span>
              </div>
              <strong className="font-bold">54 Unit</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--canvas-soft)] transition">
              <div className="flex items-center gap-2">
                <Armchair size={15} className="text-purple-600" />
                <span>Mebel & Furnitur Kantor</span>
              </div>
              <strong className="font-bold">145 Unit</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles (Apple Bento Style) */}
      <div className="nim-action-grid">
        <button
          onClick={() => setActiveAppTab("register")}
          className="nim-action-card group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
            <Plus size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-sky-600 transition">
            Registrasi Aset (QR)
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Input unit baru & generate label QR otomatis.
          </p>
        </button>

        <button
          onClick={() => setActiveAppTab("scanner")}
          className="nim-action-card group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <QrCode size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-emerald-600 transition">
            Pemindai Cepat (&lt;5s)
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Lookup instan riwayat spek dan penanggung jawab.
          </p>
        </button>

        <button
          onClick={() => setActiveAppTab("transfer")}
          className="nim-action-card group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <RefreshCw size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-amber-600 transition">
            Kelola Mutasi Cabang
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Persetujuan & pelacakan status in-transit.
          </p>
        </button>

        <button
          onClick={() => setActiveAppTab("depreciation")}
          className="nim-action-card group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-purple-600 transition">
            Rekap Depresiasi
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Kalkulasi garis lurus & buku kas aset tetap.
          </p>
        </button>
      </div>
    </motion.div>
  );
}
