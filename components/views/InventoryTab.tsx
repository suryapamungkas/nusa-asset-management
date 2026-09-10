"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Plus, Download, RefreshCw } from "lucide-react";
import { Asset } from "@/lib/types";
import { calculateDepreciation, formatRupiah } from "@/lib/assetData";

interface InventoryTabProps {
  filteredAssets: Asset[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  filterBranch: string;
  setFilterBranch: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  exportCsv: () => void;
  setActiveAppTab: (tab: "dashboard" | "inventory" | "register" | "scanner" | "transfer" | "maintenance" | "depreciation" | "disposal" | "uat-runner") => void;
  setSelectedAssetDetail: (asset: Asset) => void;
  setDrawerPanel: (panel: "search" | "bag" | "profile" | null) => void;
}

export function InventoryTab({
  filteredAssets,
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  filterBranch,
  setFilterBranch,
  filterStatus,
  setFilterStatus,
  exportCsv,
  setActiveAppTab,
  setSelectedAssetDetail,
  setDrawerPanel
}: InventoryTabProps) {
  return (
    <motion.div
      key="inventory"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="nim-card space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            Katalog Inventaris Aset Perusahaan
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Menampilkan {filteredAssets.length} unit dari total inventaris terdata.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveAppTab("register")}
            className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus size={14} /> Tambah Aset
          </button>
          <button
            onClick={exportCsv}
            className="px-3 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Multi-Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-1 relative">
          <Search className="absolute left-3 top-3 text-[var(--ink-soft)]" size={15} />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500"
            placeholder="Cari ID, Nama, SN, Custodian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <select
            className="w-full px-3 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500 font-medium"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="ALL">Semua Kategori Aset</option>
            <option value="IT Hardware">IT Hardware & Laptop</option>
            <option value="Kendaraan">Kendaraan Operasional</option>
            <option value="Jaringan">Jaringan & Server</option>
            <option value="Percetakan">Mesin & Percetakan</option>
            <option value="Mebel">Mebel & Kantor</option>
          </select>
        </div>

        <div>
          <select
            className="w-full px-3 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500 font-medium"
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
          >
            <option value="ALL">Semua Lokasi Cabang</option>
            <option value="Jakarta">Jakarta (Kantor Pusat)</option>
            <option value="Surabaya">Cabang Surabaya</option>
            <option value="Medan">Cabang Medan</option>
            <option value="Makassar">Cabang Makassar</option>
          </select>
        </div>

        <div>
          <select
            className="w-full px-3 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500 font-medium"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">Semua Status</option>
            <option value="Digunakan">Digunakan (Assigned)</option>
            <option value="Tersedia">Tersedia di Gudang</option>
            <option value="Maintenance">Dalam Maintenance</option>
            <option value="In-Transit">Dalam Pengiriman</option>
            <option value="Disposed">Disposed / Scrap</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="nim-table-wrap">
        <table className="nim-table">
          <thead>
            <tr>
              <th>Kode Aset</th>
              <th>Nama & Seri</th>
              <th>Kategori</th>
              <th>Cabang</th>
              <th>Penanggung Jawab</th>
              <th>Tgl Beli</th>
              <th>Nilai Buku</th>
              <th>Status</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-[var(--ink-soft)]">
                  Tidak ditemukan aset yang cocok dengan filter yang dipilih.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => {
                const depr = calculateDepreciation(
                  asset.cost,
                  asset.salvage,
                  asset.life,
                  asset.date
                );

                let badgeClass = "badge-subtle";
                if (asset.status === "Digunakan") badgeClass = "badge-subtle badge-green";
                if (asset.status === "Tersedia") badgeClass = "badge-subtle badge-blue";
                if (asset.status === "Maintenance") badgeClass = "badge-subtle badge-amber";
                if (asset.status === "In-Transit") badgeClass = "badge-subtle badge-purple";
                if (asset.status === "Disposed") badgeClass = "badge-subtle badge-rose";

                return (
                  <tr key={asset.id}>
                    <td>
                      <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                        {asset.id}
                      </span>
                    </td>
                    <td>
                      <strong className="font-bold text-[var(--ink)] block">
                        {asset.name}
                      </strong>
                      <span className="text-[11px] text-[var(--ink-soft)]">
                        SN: {asset.serial} &bull; {asset.brand}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs">{asset.category}</span>
                    </td>
                    <td>
                      <span className="text-xs font-medium">{asset.branch}</span>
                    </td>
                    <td>
                      <span className="text-xs">
                        {asset.custodian || <em className="text-neutral-400">Unassigned</em>}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-mono">{asset.date}</span>
                    </td>
                    <td>
                      <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {formatRupiah(depr.bookValue)}
                      </strong>
                    </td>
                    <td>
                      <span className={badgeClass}>{asset.status}</span>
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedAssetDetail(asset)}
                          className="px-2 py-1 rounded-lg bg-[var(--canvas-soft)] hover:bg-[var(--canvas-muted)] text-[11px] font-bold border border-[var(--line)] transition"
                          title="Detail Spek & QR"
                        >
                          🔍 Detail
                        </button>
                        <button
                          onClick={() => {
                            setDrawerPanel("bag");
                          }}
                          className="p-1 rounded-lg bg-[var(--canvas-soft)] hover:bg-[var(--canvas-muted)] text-[11px] border border-[var(--line)] transition"
                          title="Ajukan Mutasi"
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
