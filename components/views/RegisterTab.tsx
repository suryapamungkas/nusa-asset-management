"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Plus } from "lucide-react";
import { Asset, AssetCategory, BranchLocation } from "@/lib/types";
import { generateSimpleQrSvg } from "@/lib/assetData";

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
  setRegName,
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
  setRegLife
}: RegisterTabProps) {
  return (
    <motion.div
      key="register"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Form Input (7 cols) */}
      <div className="lg:col-span-7 nim-card space-y-4">
        <div className="pb-3 border-b border-[var(--line)]">
          <h3 className="text-base font-extrabold text-[var(--ink)]">
            Registrasi Aset Baru & Auto QR Generator
          </h3>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Input data fisik unit untuk menghasilkan QR Code dan memasukkannya ke database inventaris.
          </p>
        </div>

        {regNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{regNotice}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="drawer-form-label">Nama Aset *</label>
              <input
                type="text"
                className="drawer-input text-xs"
                placeholder="e.g. MacBook Pro 14 M3"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="drawer-form-label">Kategori *</label>
              <select
                className="drawer-input text-xs"
                value={regCategory}
                onChange={(e) => setRegCategory(e.target.value as AssetCategory)}
                required
              >
                <option value="IT Hardware">IT Hardware & Komputer</option>
                <option value="Kendaraan">Kendaraan Operasional</option>
                <option value="Jaringan">Jaringan, Firewall & Server</option>
                <option value="Percetakan">Mesin & Printer</option>
                <option value="Mebel">Mebel & Perabot Kantor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="drawer-form-label">Merk / Brand *</label>
              <input
                type="text"
                className="drawer-input text-xs"
                placeholder="e.g. Apple / Dell / Toyota"
                value={regBrand}
                onChange={(e) => setRegBrand(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="drawer-form-label">Nomor Seri (Serial Number) *</label>
              <input
                type="text"
                className="drawer-input text-xs font-mono"
                placeholder="e.g. SN-99820-X"
                value={regSerial}
                onChange={(e) => setRegSerial(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="drawer-form-label">Penempatan Cabang *</label>
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
              <label className="drawer-form-label">Custodian (Penanggung Jawab)</label>
              <input
                type="text"
                className="drawer-input text-xs"
                placeholder="Nama staf pemegang aset"
                value={regCustodian}
                onChange={(e) => setRegCustodian(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="drawer-form-label">Harga Perolehan (Rp) *</label>
              <input
                type="number"
                className="drawer-input text-xs"
                value={regCost}
                onChange={(e) => setRegCost(Number(e.target.value))}
                min={100000}
                required
              />
            </div>

            <div>
              <label className="drawer-form-label">Nilai Sisa / Residu (Rp)</label>
              <input
                type="number"
                className="drawer-input text-xs"
                value={regSalvage}
                onChange={(e) => setRegSalvage(Number(e.target.value))}
                min={0}
              />
            </div>

            <div>
              <label className="drawer-form-label">Masa Manfaat (Tahun) *</label>
              <input
                type="number"
                className="drawer-input text-xs"
                value={regLife}
                onChange={(e) => setRegLife(Number(e.target.value))}
                min={1}
                max={20}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus size={15} /> Daftarkan & Simpan ke Sistem
          </button>
        </form>
      </div>

      {/* Right: Live Preview QR Tag (5 cols) */}
      <div className="lg:col-span-5 nim-card space-y-4 flex flex-col justify-between">
        <div className="pb-3 border-b border-[var(--line)]">
          <h3 className="text-base font-extrabold text-[var(--ink)]">
            Pratinjau Langsung Label QR
          </h3>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Simulasi tampilan stiker fisik yang akan ditempel pada fisik barang.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--canvas-soft)] border-2 border-dashed border-[var(--line-strong)] text-center space-y-3">
          <div className="inline-block p-3 rounded-xl bg-white dark:bg-black border border-[var(--line)] shadow-sm">
            <div
              className="text-neutral-900 dark:text-white"
              dangerouslySetInnerHTML={{
                __html: generateSimpleQrSvg(
                  `AST-${regBranch.substring(0, 3).toUpperCase()}-2026-${regSerial || "PREVIEW"}`,
                  140
                )
              }}
            />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 block">
              AST-{regBranch.substring(0, 3).toUpperCase()}-2026-{String(assets.length + 1).padStart(3, "0")}
            </span>
            <h4 className="text-sm font-bold text-[var(--ink)] mt-1">
              {regName || "Nama Aset Baru"}
            </h4>
            <p className="text-xs text-[var(--ink-soft)]">
              {regBranch} &bull; {regCustodian || "Belum Ditugaskan"}
            </p>
          </div>
        </div>

        <div className="text-xs text-[var(--ink-soft)] space-y-1">
          <p className="font-semibold text-[var(--ink)]">Spesifikasi Label Fisik:</p>
          <p>&bull; Bahan: Vinyl Sintetis Tahan Air & Panas (Outdoor Ready)</p>
          <p>&bull; Dimensi: 50mm x 30mm dengan barcode/QR densitas tinggi</p>
        </div>
      </div>
    </motion.div>
  );
}
