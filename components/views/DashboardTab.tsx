"use client";

import React, { useState } from "react";
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
  Armchair,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface DashboardTabProps {
  exportCsv: () => void;
  setActiveAppTab: (tab: "dashboard" | "inventory" | "register" | "scanner" | "transfer" | "maintenance" | "depreciation" | "disposal" | "uat-runner") => void;
  pendingTransfersCount: number;
  onFilterBranch?: (branch: string) => void;
  onFilterCategory?: (category: string) => void;
  onFilterStatus?: (status: string) => void;
}

interface ActivityEvent {
  id: string;
  time: string;
  type: "mutasi" | "servis" | "verifikasi" | "registrasi";
  title: string;
  desc: string;
  badge: string;
  badgeColor: string;
}

const RECENT_ACTIVITIES: ActivityEvent[] = [
  {
    id: "act-1",
    time: "5 menit lalu",
    type: "verifikasi",
    title: "Pemindaian QR Lapangan Berhasil",
    desc: "Unit AST-JKT-2024-001 (MacBook Pro 14 M3 Pro) dipindai di Lantai 3 Ruang IT.",
    badge: "Terverifikasi",
    badgeColor: "badge-green"
  },
  {
    id: "act-2",
    time: "24 menit lalu",
    type: "mutasi",
    title: "Permohonan Mutasi Baru Diajukan",
    desc: "Unit AST-SBY-2024-007 (Dell Latitude 5440) diajukan mutasi dari Surabaya ke Kantor Pusat Jakarta.",
    badge: "Approval Manajer",
    badgeColor: "badge-amber"
  },
  {
    id: "act-3",
    time: "1 jam lalu",
    type: "servis",
    title: "Servis AC Server Selesai",
    desc: "Pemeliharaan preventif Dell PowerEdge R750 selesai oleh vendor resmi dengan hasil normal.",
    badge: "Servis Tuntas",
    badgeColor: "badge-blue"
  },
  {
    id: "act-4",
    time: "3 jam lalu",
    type: "registrasi",
    title: "Aset Baru Terdaftar dalam Inventaris",
    desc: "Unit AST-MKS-2026-015 (Printer Epson L3210) berhasil didaftarkan lengkap dengan label QR.",
    badge: "QR Generated",
    badgeColor: "badge-purple"
  }
];

export function DashboardTab({
  exportCsv,
  setActiveAppTab,
  pendingTransfersCount,
  onFilterBranch,
  onFilterCategory,
  onFilterStatus
}: DashboardTabProps) {
  const [activityFilter, setActivityFilter] = useState<"all" | "mutasi" | "servis" | "verifikasi">("all");

  const filteredActivities = activityFilter === "all"
    ? RECENT_ACTIVITIES
    : RECENT_ACTIVITIES.filter((a) => a.type === activityFilter);

  const handleBranchClick = (branch: string) => {
    if (onFilterBranch) {
      onFilterBranch(branch);
    } else {
      setActiveAppTab("inventory");
    }
  };

  const handleCategoryClick = (category: string) => {
    if (onFilterCategory) {
      onFilterCategory(category);
    } else {
      setActiveAppTab("inventory");
    }
  };

  const handleStatusClick = (status: string) => {
    if (onFilterStatus) {
      onFilterStatus(status);
    } else {
      setActiveAppTab("inventory");
    }
  };

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              Real-Time Cockpit
            </span>
            <span className="text-xs text-[var(--ink-soft)]">
              4 Kantor Cabang Operasional
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)] mt-1">
            Dashboard Manajemen Aset Terpadu
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-0.5">
            Monitoring terpusat 524 unit aset fisik, valuasi PSAK 16, status mutasi, dan kalender pemeliharaan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Unduh Rekap Inventaris CSV"
          >
            <Download size={14} /> Unduh CSV
          </button>
          <button
            onClick={() => setActiveAppTab("scanner")}
            className="px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Buka Pemindai QR Cepat"
          >
            <QrCode size={14} /> Pemindai QR
          </button>
          <button
            onClick={() => setActiveAppTab("register")}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            title="Daftarkan Aset Baru"
          >
            <Plus size={14} /> Aset Baru
          </button>
        </div>
      </div>

      {/* Bento Grid: 5 Top Metric Cards with Clickable Drill-Downs */}
      <div className="nim-metric-grid">
        {/* Metric 1: Total Aset */}
        <div
          onClick={() => setActiveAppTab("inventory")}
          className="nim-card cursor-pointer group hover:border-sky-500 transition"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveAppTab("inventory"); }}
          title="Klik untuk melihat seluruh katalog inventaris"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
              Total Aset Terdata
            </span>
            <ArrowRight size={14} className="text-[var(--ink-faint)] group-hover:text-sky-600 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="text-2xl font-extrabold text-[var(--ink)] mt-2">
            524 <span className="text-xs font-normal text-[var(--ink-soft)]">Unit</span>
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1 flex items-center gap-1">
            <Building2 size={12} className="text-sky-600" /> 1 Pusat &bull; 3 Cabang
          </p>
        </div>

        {/* Metric 2: Valuasi Nilai Buku */}
        <div
          onClick={() => setActiveAppTab("depreciation")}
          className="nim-card border-l-4 border-l-emerald-500 cursor-pointer group hover:border-emerald-500 transition"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveAppTab("depreciation"); }}
          title="Klik untuk membuka kalkulator depresiasi PSAK 16"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Valuasi Nilai Buku
            </span>
            <TrendingUp size={14} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            Rp 3,21 M
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1">
            Perolehan: Rp 4,85 M &bull; PSAK 16
          </p>
        </div>

        {/* Metric 3: Aset Aktif */}
        <div
          onClick={() => handleStatusClick("Digunakan")}
          className="nim-card border-l-4 border-l-sky-500 cursor-pointer group hover:border-sky-500 transition"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleStatusClick("Digunakan"); }}
          title="Klik untuk memfilter aset dengan status Digunakan"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Aset Aktif / Custodian
            </span>
            <ShieldCheck size={14} className="text-sky-600 dark:text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-[var(--ink)] mt-2">
            482 <span className="text-xs font-normal text-emerald-600 font-semibold">(92%)</span>
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1">
            Terhubung penanggung jawab resmi
          </p>
        </div>

        {/* Metric 4: Dalam Servis */}
        <div
          onClick={() => setActiveAppTab("maintenance")}
          className="nim-card border-l-4 border-l-amber-500 cursor-pointer group hover:border-amber-500 transition"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveAppTab("maintenance"); }}
          title="Klik untuk membuka jadwal pemeliharaan dan servis"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Dalam Servis / Maint
            </span>
            <Clock size={14} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            28 <span className="text-xs font-normal text-[var(--ink-soft)]">(5%)</span>
          </div>
          <p className="text-[11px] text-[var(--ink-soft)] mt-1">
            6 Butuh Perhatian Segera
          </p>
        </div>

        {/* Metric 5: Pending Mutasi */}
        <div
          onClick={() => setActiveAppTab("transfer")}
          className="nim-card border-l-4 border-l-rose-500 cursor-pointer group hover:border-rose-500 transition"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveAppTab("transfer"); }}
          title="Klik untuk mengelola mutasi dan permohonan transfer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Pending Mutasi
            </span>
            <RefreshCw size={14} className="text-rose-600 dark:text-rose-400" />
          </div>
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
            <span className="badge-subtle badge-blue">4 Lokasi Terhubung</span>
          </div>

          <div className="space-y-4 pt-1">
            {/* Jakarta */}
            <div
              className="p-3 rounded-xl border border-[var(--line)] hover:border-sky-500 bg-[var(--canvas-soft)]/50 cursor-pointer transition"
              onClick={() => handleBranchClick("Jakarta")}
            >
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Kantor Pusat (Jakarta)
                </span>
                <span className="text-sky-600 dark:text-sky-400 font-mono">
                  242 Unit (46.2%) &bull; Filter &rarr;
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "46.2%" }} />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--ink-soft)] mt-1.5">
                <span>Nilai Buku: Rp 1,52 M</span>
                <span>Aktif: 228 Unit &bull; Servis: 14 Unit</span>
              </div>
            </div>

            {/* Surabaya */}
            <div
              className="p-3 rounded-xl border border-[var(--line)] hover:border-sky-500 bg-[var(--canvas-soft)]/50 cursor-pointer transition"
              onClick={() => handleBranchClick("Surabaya")}
            >
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Cabang Surabaya
                </span>
                <span className="text-sky-600 dark:text-sky-400 font-mono">
                  118 Unit (22.5%) &bull; Filter &rarr;
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: "22.5%" }} />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--ink-soft)] mt-1.5">
                <span>Nilai Buku: Rp 740 Juta</span>
                <span>Aktif: 110 Unit &bull; Servis: 8 Unit</span>
              </div>
            </div>

            {/* Medan */}
            <div
              className="p-3 rounded-xl border border-[var(--line)] hover:border-emerald-500 bg-[var(--canvas-soft)]/50 cursor-pointer transition"
              onClick={() => handleBranchClick("Medan")}
            >
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Cabang Medan
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  94 Unit (17.9%) &bull; Filter &rarr;
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "17.9%" }} />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--ink-soft)] mt-1.5">
                <span>Nilai Buku: Rp 580 Juta</span>
                <span>Aktif: 90 Unit &bull; Servis: 4 Unit</span>
              </div>
            </div>

            {/* Makassar */}
            <div
              className="p-3 rounded-xl border border-[var(--line)] hover:border-amber-500 bg-[var(--canvas-soft)]/50 cursor-pointer transition"
              onClick={() => handleBranchClick("Makassar")}
            >
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Cabang Makassar
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-mono">
                  70 Unit (13.4%) &bull; Filter &rarr;
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "13.4%" }} />
              </div>
              <div className="flex justify-between text-[11px] text-[var(--ink-soft)] mt-1.5">
                <span>Nilai Buku: Rp 370 Juta</span>
                <span>Aktif: 68 Unit &bull; Servis: 2 Unit</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] flex items-center justify-between text-xs mt-3">
            <span className="text-[var(--ink-soft)]">
              Seluruh unit fisik terlabeli stiker barcode/QR tahan cuaca.
            </span>
            <button
              onClick={() => setActiveAppTab("scanner")}
              className="font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              Buka Scanner Lapangan &rarr;
            </button>
          </div>
        </div>

        {/* Right: Category Breakdown (5 Cols) */}
        <div className="lg:col-span-5 nim-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <Layers className="text-indigo-600 dark:text-indigo-400" size={18} />
              <h3 className="text-sm font-extrabold text-[var(--ink)]">
                Komposisi 5 Kategori Aset Fisik
              </h3>
            </div>
            <span className="badge-subtle badge-purple">Terklasifikasi</span>
          </div>

          <p className="text-xs text-[var(--ink-soft)]">
            Klik kategori untuk langsung memfilter inventaris:
          </p>

          <div className="space-y-2.5 text-xs pt-1">
            <button
              onClick={() => handleCategoryClick("IT Hardware")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[var(--line)] hover:border-sky-500 bg-[var(--canvas-soft)]/40 hover:bg-[var(--canvas-soft)] transition text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  <Laptop size={15} />
                </div>
                <div>
                  <strong className="block text-[var(--ink)]">IT Hardware & Komputer</strong>
                  <span className="text-[11px] text-[var(--ink-soft)]">Laptop, PC Desktop, Workstation</span>
                </div>
              </div>
              <div className="text-right">
                <strong className="font-extrabold text-[var(--ink)] block">215 Unit</strong>
                <span className="text-[10px] text-sky-600 font-semibold">41.0%</span>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick("Kendaraan")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[var(--line)] hover:border-emerald-500 bg-[var(--canvas-soft)]/40 hover:bg-[var(--canvas-soft)] transition text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Car size={15} />
                </div>
                <div>
                  <strong className="block text-[var(--ink)]">Kendaraan Operasional</strong>
                  <span className="text-[11px] text-[var(--ink-soft)]">Mobil Kurir, MPV, Sepeda Motor</span>
                </div>
              </div>
              <div className="text-right">
                <strong className="font-extrabold text-[var(--ink)] block">42 Unit</strong>
                <span className="text-[10px] text-emerald-600 font-semibold">8.0%</span>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick("Jaringan")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[var(--line)] hover:border-blue-500 bg-[var(--canvas-soft)]/40 hover:bg-[var(--canvas-soft)] transition text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  <Network size={15} />
                </div>
                <div>
                  <strong className="block text-[var(--ink)]">Jaringan & Server</strong>
                  <span className="text-[11px] text-[var(--ink-soft)]">Server Rack, Switch, Firewall</span>
                </div>
              </div>
              <div className="text-right">
                <strong className="font-extrabold text-[var(--ink)] block">68 Unit</strong>
                <span className="text-[10px] text-blue-600 font-semibold">13.0%</span>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick("Percetakan")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[var(--line)] hover:border-amber-500 bg-[var(--canvas-soft)]/40 hover:bg-[var(--canvas-soft)] transition text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  <PrintIcon size={15} />
                </div>
                <div>
                  <strong className="block text-[var(--ink)]">Mesin & Percetakan</strong>
                  <span className="text-[11px] text-[var(--ink-soft)]">Printer Laser, Barcode Scanner</span>
                </div>
              </div>
              <div className="text-right">
                <strong className="font-extrabold text-[var(--ink)] block">54 Unit</strong>
                <span className="text-[10px] text-amber-600 font-semibold">10.3%</span>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick("Mebel")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[var(--line)] hover:border-purple-500 bg-[var(--canvas-soft)]/40 hover:bg-[var(--canvas-soft)] transition text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  <Armchair size={15} />
                </div>
                <div>
                  <strong className="block text-[var(--ink)]">Mebel & Perabot Kantor</strong>
                  <span className="text-[11px] text-[var(--ink-soft)]">Meja Kerja, Kursi Ergonomis, Lemari</span>
                </div>
              </div>
              <div className="text-right">
                <strong className="font-extrabold text-[var(--ink)] block">145 Unit</strong>
                <span className="text-[10px] text-purple-600 font-semibold">27.7%</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Live Operational Audit Feed / Activity Timeline */}
      <div className="nim-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <Clock className="text-sky-600" size={18} />
            <div>
              <h3 className="text-sm font-extrabold text-[var(--ink)]">
                Log Audit &amp; Aktivitas Operasional Terkini
              </h3>
              <p className="text-[11px] text-[var(--ink-soft)]">
                Rekaman peristiwa perpindahan, verifikasi QR, servis, dan registrasi aset.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {(
              [
                { id: "all", label: "Semua" },
                { id: "mutasi", label: "Mutasi" },
                { id: "servis", label: "Servis" },
                { id: "verifikasi", label: "QR Scan" }
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setActivityFilter(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  activityFilter === f.id
                    ? "bg-[var(--ink)] text-[var(--canvas)]"
                    : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {filteredActivities.map((event) => (
            <div
              key={event.id}
              className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--canvas-soft)]/40 hover:bg-[var(--canvas-soft)] transition space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[var(--ink-soft)]">
                  {event.time}
                </span>
                <span className={`badge-subtle ${event.badgeColor}`}>
                  {event.badge}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[var(--ink)]">
                {event.title}
              </h4>
              <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
                {event.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="nim-action-grid">
        <button
          onClick={() => setActiveAppTab("register")}
          className="nim-action-card group"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
            <Plus size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-sky-600 transition">
            Registrasi Aset (QR)
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Input unit baru dan cetak label thermal fisik otomatis.
          </p>
        </button>

        <button
          onClick={() => setActiveAppTab("scanner")}
          className="nim-action-card group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <QrCode size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-emerald-600 transition">
            Pemindai Cepat (&lt; 5s)
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Pindai fisik QR untuk audit spek dan custodian seketika.
          </p>
        </button>

        <button
          onClick={() => setActiveAppTab("transfer")}
          className="nim-action-card group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <RefreshCw size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-amber-600 transition">
            Kelola Mutasi Cabang
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Alur persetujuan transfer antar-cabang dan serah terima.
          </p>
        </button>

        <button
          onClick={() => setActiveAppTab("depreciation")}
          className="nim-action-card group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
          <h4 className="text-xs font-bold text-[var(--ink)] group-hover:text-purple-600 transition">
            Rekap Depresiasi
          </h4>
          <p className="text-[11px] text-[var(--ink-soft)]">
            Simulasi garis lurus PSAK 16 dan rekap buku kas aset tetap.
          </p>
        </button>
      </div>
    </motion.div>
  );
}
