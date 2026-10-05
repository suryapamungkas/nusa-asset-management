"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Plus,
  Printer,
  TrendingDown
} from "lucide-react";
import { Asset, AssetCategory, BranchLocation } from "@/lib/types";
import { generateSimpleQrSvg, formatRupiah } from "@/lib/assetData";

interface RegisterTabProps {
  assets: Asset[];
  handleRegisterSubmit: (e: React.FormEvent) => void;
  regNotice: string;
  regName: string;
  setRegName: (val: string) => void;
  regCategory: AssetCategory;
  setRegCategory: (val: AssetCategory) => void;
  regBrand: string;
  setRegBrand: (val: string) => void;
  regSerial: string;
  setRegSerial: (val: string) => void;
  regBranch: BranchLocation;
  setRegBranch: (val: BranchLocation) => void;
  regCustodian: string;
  setRegCustodian: (val: string) => void;
  regCost: number;
  setRegCost: (val: number) => void;
  regSalvage: number;
  setRegSalvage: (val: number) => void;
  regLife: number;
  setRegLife: (val: number) => void;
}

export function RegisterTab({
  assets,
  handleRegisterSubmit,
  regNotice,
  regName,
  regCategory,
  setRegCategory,
  regBrand,
  setRegBrand,
  regSerial,
  setRegSerial,
  regBranch,
  setRegBranch,
  regCustodian,
  setRegCustodian,
  regCost,
  setRegCost,
  regSalvage,
  setRegSalvage,
  regLife,
  setRegLife,
  setRegName
}: RegisterTabProps) {
  // Compute next code preview
  const branchCode =
    regBranch === "Jakarta"
      ? "JKT"
      : regBranch === "Surabaya"
      ? "SBY"
      : regBranch === "Medan"
      ? "MDN"
      : "MKS";
  const nextSeq = String(assets.length + 1).padStart(3, "0");
  const previewAssetId = `AST-${branchCode}-2026-${nextSeq}`;

  // Mini depreciation calculation
  const totalMonths = Math.max(1, regLife * 12);
  const depreciableAmount = Math.max(0, regCost - regSalvage);
  const monthlyDeprec = Math.round(depreciableAmount / totalMonths);

  const handlePrintPreview = () => {
    window.print();
  };

  const handleApplyPreset = (type: "laptop" | "car" | "server") => {
    if (type === "laptop") {
      setRegName("Dell Latitude 5540 Core i7 (16GB/512GB)");
      setRegCategory("IT Hardware");
      setRegBrand("Dell");
      setRegSerial(`DL-5540-${Math.floor(Math.random() * 89999 + 10000)}`);
      setRegCost(18500000);
      setRegSalvage(2000000);
      setRegLife(4);
      setRegCustodian("Staff Operasional");
    } else if (type === "car") {
      setRegName("Toyota Avanza 1.5 G MT Kurir Cabang");
      setRegCategory("Kendaraan");
      setRegBrand("Toyota");
      setRegSerial(`B ${Math.floor(Math.random() * 8999 + 1000)} NIM`);
      setRegCost(240000000);
      setRegSalvage(70000000);
      setRegLife(8);
      setRegCustodian("Driver Logistik");
    } else if (type === "server") {
      setRegName("HP ProLiant DL380 Gen10 Server 2U");
      setRegCategory("Jaringan");
      setRegBrand("HPE");
      setRegSerial(`HPE-DL380-${Math.floor(Math.random() * 89999 + 10000)}`);
      setRegCost(95000000);
      setRegSalvage(12000000);
      setRegLife(5);
      setRegCustodian("Admin Server Cabang");
    }
  };

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Form Input (7 cols) */}
      <div className="lg:col-span-7 nim-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--line)]">
          <div>
            <h3 className="text-base font-extrabold text-[var(--ink)]">
              Registrasi Aset Baru &amp; Generator Label QR
            </h3>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Input data spesifikasi fisik untuk menghasilkan kode unik dan mendaftarkannya ke sistem inventaris.
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] text-[var(--ink-soft)] font-medium">Contoh:</span>
            <button
              type="button"
              onClick={() => handleApplyPreset("laptop")}
              className="px-2 py-1 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] text-[11px] font-bold hover:bg-[var(--canvas-muted)] transition"
              title="Isi contoh laptop"
            >
              Laptop
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("car")}
              className="px-2 py-1 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] text-[11px] font-bold hover:bg-[var(--canvas-muted)] transition"
              title="Isi contoh mobil"
            >
              Mobil
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset("server")}
              className="px-2 py-1 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] text-[11px] font-bold hover:bg-[var(--canvas-muted)] transition"
              title="Isi contoh server"
            >
              Server
            </button>
          </div>
        </div>

        {regNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{regNotice}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          {/* Row 1: Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="drawer-form-label">Nama Aset Fisik *</label>
              <input
                type="text"
                className="drawer-input text-xs"
                placeholder="Contoh: MacBook Pro 14 M3 Pro"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="drawer-form-label">Kategori Aset *</label>
              <select
                className="drawer-input text-xs"
                value={regCategory}
                onChange={(e) => setRegCategory(e.target.value as AssetCategory)}
                required
              >
                <option value="IT Hardware">IT Hardware &amp; Komputer</option>
                <option value="Kendaraan">Kendaraan Operasional &amp; Kurir</option>
                <option value="Jaringan">Jaringan, Firewall &amp; Server</option>
                <option value="Percetakan">Mesin Cetak &amp; Printer</option>
                <option value="Mebel">Mebel &amp; Perabot Kantor</option>
              </select>
            </div>
          </div>

          {/* Row 2: Brand & Serial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="drawer-form-label">Merk / Brand Pabrikan *</label>
              <input
                type="text"
                className="drawer-input text-xs"
                placeholder="Contoh: Apple, Dell, Lenovo, Toyota"
                value={regBrand}
                onChange={(e) => setRegBrand(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="drawer-form-label">Nomor Seri Fisik (Serial Number) *</label>
              <input
                type="text"
                className="drawer-input text-xs font-mono"
                placeholder="Contoh: SN-88902-M3X"
                value={regSerial}
                onChange={(e) => setRegSerial(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 3: Branch & Custodian */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="drawer-form-label">Penempatan Kantor Cabang *</label>
              <select
                className="drawer-input text-xs"
                value={regBranch}
                onChange={(e) => setRegBranch(e.target.value as BranchLocation)}
                required
              >
                <option value="Jakarta">Kantor Pusat (Jakarta)</option>
                <option value="Surabaya">Cabang Surabaya</option>
                <option value="Medan">Cabang Medan</option>
                <option value="Makassar">Cabang Makassar</option>
              </select>
            </div>

            <div>
              <label className="drawer-form-label">Penanggung Jawab (Custodian)</label>
              <input
                type="text"
                className="drawer-input text-xs"
                placeholder="Nama staf pemegang aset"
                value={regCustodian}
                onChange={(e) => setRegCustodian(e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Financials */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="drawer-form-label">Harga Perolehan (Rp) *</label>
              <input
                type="number"
                className="drawer-input text-xs font-mono"
                value={regCost}
                onChange={(e) => setRegCost(Number(e.target.value))}
                min={100000}
                required
              />
            </div>

            <div>
              <label className="drawer-form-label">Nilai Residu / Sisa (Rp)</label>
              <input
                type="number"
                className="drawer-input text-xs font-mono"
                value={regSalvage}
                onChange={(e) => setRegSalvage(Number(e.target.value))}
                min={0}
              />
            </div>

            <div>
              <label className="drawer-form-label">Masa Manfaat (Tahun) *</label>
              <input
                type="number"
                className="drawer-input text-xs font-mono"
                value={regLife}
                onChange={(e) => setRegLife(Number(e.target.value))}
                min={1}
                max={20}
                required
              />
            </div>
          </div>

          {/* Live Mini Depreciation Projection */}
          <div className="p-3 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-[var(--ink-soft)]">
              <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                <TrendingDown size={13} />
                Estimasi Depresiasi PSAK 16:
              </span>
              <span>Masa Manfaat: {totalMonths} Bulan</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--ink-soft)]">Beban Penyusutan per Bulan:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                {formatRupiah(monthlyDeprec)}
              </strong>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus size={15} /> Daftarkan Unit &amp; Masukkan ke Katalog
          </button>
        </form>
      </div>

      {/* Right: Live Preview Physical QR Label (5 cols) */}
      <div className="lg:col-span-5 nim-card space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div>
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                Pratinjau Stiker Label Fisik
              </h3>
              <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                Simulasi tampilan cetak stiker thermal tahan air (50mm x 30mm).
              </p>
            </div>
            <span className="badge-subtle badge-blue font-mono text-[10px]">
              Thermal 50x30
            </span>
          </div>

          {/* Physical Label Mockup */}
          <div className="p-4 sm:p-5 mt-4 rounded-2xl bg-[var(--canvas-soft)] border-2 border-dashed border-[var(--line-strong)] text-center space-y-3">
            {/* White Thermal Sticker Badge */}
            <div className="p-4 rounded-xl bg-white text-neutral-900 border border-neutral-300 shadow-md text-left space-y-3 max-w-[280px] mx-auto">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5 text-[9px] font-bold tracking-wider uppercase text-neutral-500">
                <span>PT Nusa Integra Mandiri</span>
                <span>ASSET TAG</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="shrink-0 text-black"
                  dangerouslySetInnerHTML={{
                    __html: generateSimpleQrSvg(previewAssetId, 72)
                  }}
                />
                <div className="min-w-0">
                  <span className="font-mono text-xs font-black text-black block tracking-tight">
                    {previewAssetId}
                  </span>
                  <p className="text-[11px] font-bold text-neutral-800 truncate mt-0.5">
                    {regName || "Nama Aset Baru"}
                  </p>
                  <p className="text-[9px] text-neutral-500 font-mono mt-0.5">
                    SN: {regSerial || "XXXXXXXX"}
                  </p>
                  <span className="inline-block mt-1 text-[8px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
                    {regBranch}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-1 text-[8px] text-neutral-500 flex justify-between">
                <span>Do Not Remove Label</span>
                <span>Ver. 2026</span>
              </div>
            </div>

            {/* Label Meta Specs */}
            <div className="text-xs text-left pt-2 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--ink-soft)]">Kode Aset Terbit:</span>
                <strong className="font-mono text-sky-600 dark:text-sky-400">
                  {previewAssetId}
                </strong>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--ink-soft)]">Pemegang Fisik:</span>
                <strong className="text-[var(--ink)]">
                  {regCustodian || "Belum Ditugaskan"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Print Action & Label Specs */}
        <div className="space-y-3 pt-2 border-t border-[var(--line)]">
          <div className="text-[11px] text-[var(--ink-soft)] space-y-0.5">
            <p className="font-bold text-[var(--ink)]">Spesifikasi Material Label:</p>
            <p>&bull; Bahan: Vinyl Sintetis Tahan Air &amp; Panas (Outdoor Ready)</p>
            <p>&bull; Ukuran Fisik: 50mm x 30mm dengan QR densitas tinggi</p>
          </div>

          <button
            type="button"
            onClick={handlePrintPreview}
            className="w-full py-2 rounded-xl border border-[var(--line)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Printer size={14} /> Cetak Stiker Label Fisik Sekarang
          </button>
        </div>
      </div>
    </motion.div>
  );
}
