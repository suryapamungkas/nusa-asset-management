"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, CheckCircle2, ShieldCheck, UserCheck, RefreshCw, Send } from "lucide-react";
import { Asset, UserRole, TransferRequest } from "@/lib/types";
import { formatRupiah, calculateDepreciation, generateSimpleQrSvg } from "@/lib/assetData";

interface AssetDrawersProps {
  panel: "search" | "bag" | "profile" | null;
  onClose: () => void;
  assets: Asset[];
  transfers: TransferRequest[];
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSelectAsset: (asset: Asset) => void;
  onSubmitTransfer: (req: Omit<TransferRequest, "id" | "date" | "status">) => void;
}

export function AssetDrawers({
  panel,
  onClose,
  assets,
  transfers,
  currentRole,
  onRoleChange,
  onSelectAsset,
  onSubmitTransfer
}: AssetDrawersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssetForTransfer, setSelectedAssetForTransfer] = useState<string>("");
  const [destBranch, setDestBranch] = useState<"Jakarta" | "Surabaya" | "Medan" | "Makassar">("Surabaya");
  const [newCustodian, setNewCustodian] = useState("");
  const [transferReason, setTransferReason] = useState("");

  const filteredAssets = searchQuery.trim() === ""
    ? assets.slice(0, 6)
    : assets.filter((a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.serial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.custodian.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.branch.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find((a) => a.id === selectedAssetForTransfer);
    if (!asset) return;

    onSubmitTransfer({
      assetId: asset.id,
      assetName: asset.name,
      fromBranch: asset.branch,
      toBranch: destBranch,
      newCustodian: newCustodian || "Belum Ditugaskan",
      reason: transferReason || "Penyesuaian kebutuhan kantor operasional"
    });

    setSelectedAssetForTransfer("");
    setNewCustodian("");
    setTransferReason("");
    onClose();
  };

  return (
    <AnimatePresence>
      {panel && (
        <>
          {/* Backdrop */}
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.aside
            className="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="drawer-header">
              <div className="drawer-title-box">
                {panel === "search" && (
                  <>
                    <Search className="text-sky-600" size={20} />
                    <h3>Pencarian Cepat Aset</h3>
                  </>
                )}
                {panel === "bag" && (
                  <>
                    <RefreshCw className="text-sky-600" size={20} />
                    <h3>Keranjang Mutasi & Transfer</h3>
                  </>
                )}
                {panel === "profile" && (
                  <>
                    <ShieldCheck className="text-emerald-600" size={20} />
                    <h3>Hak Akses & Pengguna</h3>
                  </>
                )}
              </div>
              <button
                className="drawer-close-btn"
                onClick={onClose}
                aria-label="Tutup panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="drawer-body">
              {/* PANEL 1: SEARCH */}
              {panel === "search" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3.5 text-neutral-400" size={18} />
                    <input
                      type="text"
                      className="drawer-input pl-10"
                      placeholder="Cari kode (AST-...), nama, serial number, atau custodian..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <p className="text-xs text-neutral-500 font-medium px-1">
                    {searchQuery.trim() === "" ? "Rekomendasi Aset Terkini:" : `Hasil Pencarian (${filteredAssets.length} unit):`}
                  </p>

                  <div className="space-y-2.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                    {filteredAssets.length === 0 ? (
                      <div className="p-8 text-center text-neutral-400">
                        <p className="font-semibold text-sm">Tidak ditemukan aset yang cocok.</p>
                        <p className="text-xs mt-1">Coba gunakan kode cabang atau nomor seri.</p>
                      </div>
                    ) : (
                      filteredAssets.map((asset) => {
                        const depr = calculateDepreciation(asset.cost, asset.salvage, asset.life, asset.date);
                        return (
                          <div
                            key={asset.id}
                            className="drawer-item-card"
                            onClick={() => {
                              onSelectAsset(asset);
                              onClose();
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">
                                  {asset.id}
                                </span>
                                <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                                  {asset.name}
                                </h4>
                                <p className="text-xs text-neutral-500 mt-0.5">
                                  {asset.branch} &bull; {asset.custodian || "Unassigned"}
                                </p>
                              </div>
                              <span className="badge-subtle">
                                {asset.status}
                              </span>
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                              <span className="text-neutral-500">Nilai Buku:</span>
                              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                {formatRupiah(depr.bookValue)}
                              </strong>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* PANEL 2: TRANSFER CART */}
              {panel === "bag" && (
                <div className="space-y-5">
                  <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl p-3.5 text-xs text-sky-900 dark:text-sky-200">
                    <p className="font-bold">Formulir Pengajuan Mutasi Baru</p>
                    <p className="text-[11px] mt-0.5 opacity-90">
                      Pilih unit aset terdaftar untuk diajukan mutasi penempatan antar-cabang.
                    </p>
                  </div>

                  <form onSubmit={handleCreateTransfer} className="space-y-3.5">
                    <div>
                      <label className="drawer-form-label">Pilih Aset Fisik *</label>
                      <select
                        className="drawer-input text-xs"
                        value={selectedAssetForTransfer}
                        onChange={(e) => setSelectedAssetForTransfer(e.target.value)}
                        required
                      >
                        <option value="">-- Pilih Aset untuk Dipindahkan --</option>
                        {assets
                          .filter((a) => a.status !== "Disposed")
                          .map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.id} &bull; {a.name} (Lokasi: {a.branch})
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="drawer-form-label">Cabang Tujuan *</label>
                        <select
                          className="drawer-input text-xs"
                          value={destBranch}
                          onChange={(e) => setDestBranch(e.target.value as any)}
                          required
                        >
                          <option value="Surabaya">Cabang Surabaya</option>
                          <option value="Medan">Cabang Medan</option>
                          <option value="Makassar">Cabang Makassar</option>
                          <option value="Jakarta">Kantor Pusat (Jakarta)</option>
                        </select>
                      </div>
                      <div>
                        <label className="drawer-form-label">Calon Custodian Baru *</label>
                        <input
                          type="text"
                          className="drawer-input text-xs"
                          placeholder="Nama penanggung jawab"
                          value={newCustodian}
                          onChange={(e) => setNewCustodian(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="drawer-form-label">Alasan Pemindahan / Catatan</label>
                      <textarea
                        className="drawer-input text-xs"
                        rows={3}
                        placeholder="Kebutuhan operasional cabang / ekspansi tim..."
                        value={transferReason}
                        onChange={(e) => setTransferReason(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send size={14} /> Ajukan Permohonan Mutasi
                    </button>
                  </form>

                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                      Permohonan Mutasi Aktif ({transfers.length}):
                    </p>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {transfers.map((t) => (
                        <div
                          key={t.id}
                          className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-sky-600">{t.id}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                              {t.status}
                            </span>
                          </div>
                          <p className="font-semibold text-neutral-900 dark:text-white mt-1">
                            {t.assetName}
                          </p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            {t.fromBranch} &rarr; {t.toBranch} ({t.newCustodian})
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PANEL 3: PROFILE & ROLE SWITCHER */}
              {panel === "profile" && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      NIM
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                        PT Nusa Integra Mandiri
                      </h4>
                      <p className="text-xs text-neutral-500">
                        Enterprise Asset Management Portal v2.4
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        ● Sesi Terotentikasi Aman
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="drawer-form-label mb-2">Simulasi Hak Akses Pengguna (Role):</label>
                    <div className="space-y-2">
                      {(
                        [
                          {
                            role: "Administrator IT",
                            desc: "Hak akses penuh: Registrasi aset baru, konfigurasi sistem, audit QR, generate label."
                          },
                          {
                            role: "Manajer Operasional & Aset",
                            desc: "Otoritas persetujuan: Approval mutasi antar-cabang, review jadwal pemeliharaan, disposal."
                          },
                          {
                            role: "Kepala Cabang",
                            desc: "Otoritas regional: Konfirmasi penerimaan aset di cabang, monitoring aset lokal."
                          },
                          {
                            role: "Staff Custodian",
                            desc: "Pengguna aset: Melihat aset yang ditugaskan, lapor kendala servis fisik."
                          }
                        ] as const
                      ).map((item) => (
                        <div
                          key={item.role}
                          onClick={() => onRoleChange(item.role)}
                          className={`p-3 rounded-xl border cursor-pointer transition ${
                            currentRole === item.role
                              ? "border-sky-600 bg-sky-50/70 dark:bg-sky-950/40 shadow-sm"
                              : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white">
                              {item.role}
                            </span>
                            {currentRole === item.role && (
                              <CheckCircle2 size={16} className="text-sky-600" />
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      Standar Tata Kelola:
                    </p>
                    <p className="text-[11px]">
                      &bull; Standar PMBOK 7th Edition & Agile Scrum Hybrid
                    </p>
                    <p className="text-[11px]">
                      &bull; Akuntansi Aset Tetap PSAK 16 (Metode Garis Lurus)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
