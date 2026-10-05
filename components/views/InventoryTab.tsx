"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  RefreshCw,
  LayoutGrid,
  Table as TableIcon,
  X,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Laptop,
  Car,
  Network,
  Printer as PrintIcon,
  Armchair,
  CheckSquare,
  Square
} from "lucide-react";
import { Asset } from "@/lib/types";
import { calculateDepreciation, formatRupiah, generateSimpleQrSvg } from "@/lib/assetData";

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

type SortField = "id" | "name" | "cost" | "bookValue" | "date";

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
  // View mode: Table vs Grid
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Sorting
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Multi-selection for batch actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [batchNotice, setBatchNotice] = useState<string>("");

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    filterCategory !== "ALL" ||
    filterBranch !== "ALL" ||
    filterStatus !== "ALL";

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCategory("ALL");
    setFilterBranch("ALL");
    setFilterStatus("ALL");
    setCurrentPage(1);
  };

  // Sort assets
  const sortedAssets = useMemo(() => {
    const list = [...filteredAssets];
    list.sort((a, b) => {
      let valA: string | number = a.id;
      let valB: string | number = b.id;

      if (sortField === "name") {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (sortField === "cost") {
        valA = a.cost;
        valB = b.cost;
      } else if (sortField === "bookValue") {
        valA = calculateDepreciation(a.cost, a.salvage, a.life, a.date).bookValue;
        valB = calculateDepreciation(b.cost, b.salvage, b.life, b.date).bookValue;
      } else if (sortField === "date") {
        valA = a.date;
        valB = b.date;
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredAssets, sortField, sortDirection]);

  // Paginated assets
  const totalPages = Math.max(1, Math.ceil(sortedAssets.length / itemsPerPage));
  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedAssets.slice(start, start + itemsPerPage);
  }, [sortedAssets, currentPage, itemsPerPage]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedAssets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedAssets.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBatchPrint = () => {
    setBatchNotice(`Menyiapkan ${selectedIds.length} label QR untuk printer thermal...`);
    setTimeout(() => {
      window.print();
      setBatchNotice("");
    }, 800);
  };

  const handleBatchExport = () => {
    const selected = filteredAssets.filter((a) => selectedIds.includes(a.id));
    let csv =
      "Kode Aset,Nama Aset,Kategori,Merk,Serial Number,Cabang,Penanggung Jawab,Tgl Perolehan,Harga Beli (Rp),Nilai Buku (Rp),Status\n";
    selected.forEach((a) => {
      const depr = calculateDepreciation(a.cost, a.salvage, a.life, a.date);
      csv += `"${a.id}","${a.name}","${a.category}","${a.brand}","${a.serial}","${a.branch}","${a.custodian}","${a.date}",${a.cost},${depr.bookValue},"${a.status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_${selected.length}_Aset_Terpilih.csv`;
    link.click();
    setBatchNotice(`Berhasil mengunduh ${selected.length} data aset terpilih!`);
    setTimeout(() => setBatchNotice(""), 3500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "IT Hardware":
        return <Laptop size={14} className="text-sky-600 dark:text-sky-400" />;
      case "Kendaraan":
        return <Car size={14} className="text-emerald-600 dark:text-emerald-400" />;
      case "Jaringan":
        return <Network size={14} className="text-blue-600 dark:text-blue-400" />;
      case "Percetakan":
        return <PrintIcon size={14} className="text-amber-600 dark:text-amber-400" />;
      default:
        return <Armchair size={14} className="text-purple-600 dark:text-purple-400" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Digunakan":
        return "badge-subtle badge-green";
      case "Tersedia":
        return "badge-subtle badge-blue";
      case "Maintenance":
        return "badge-subtle badge-amber";
      case "In-Transit":
        return "badge-subtle badge-purple";
      case "Disposed":
        return "badge-subtle badge-rose";
      default:
        return "badge-subtle";
    }
  };

  return (
    <motion.div
      key="inventory"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="nim-card space-y-5"
    >
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Katalog Inventaris Aset Terpadu
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--canvas-soft)] border border-[var(--line)] text-[var(--ink-soft)]">
              {filteredAssets.length} Unit
            </span>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Daftar seluruh aset fisik terdistribusi dengan spesifikasi teknis, penanggung jawab, dan nilai buku terkini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)]">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === "table"
                  ? "bg-[var(--canvas)] text-[var(--ink)] shadow-sm"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
              title="Tampilan Tabel Rinci"
            >
              <TableIcon size={14} />
              <span className="hidden md:inline">Tabel</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                viewMode === "grid"
                  ? "bg-[var(--canvas)] text-[var(--ink)] shadow-sm"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
              title="Tampilan Kartu Grid"
            >
              <LayoutGrid size={14} />
              <span className="hidden md:inline">Grid</span>
            </button>
          </div>

          <button
            onClick={() => setActiveAppTab("register")}
            className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={14} /> Tambah Aset
          </button>
          <button
            onClick={exportCsv}
            className="px-3 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--canvas)] hover:bg-[var(--canvas-soft)] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} /> Ekspor CSV
          </button>
        </div>
      </div>

      {/* Multi-Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-4 relative">
          <Search className="absolute left-3 top-2.5 text-[var(--ink-soft)]" size={15} />
          <input
            type="text"
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500 transition text-[var(--ink)]"
            placeholder="Cari ID (AST-...), Nama, Serial, Custodian..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-[var(--ink-soft)] hover:text-[var(--ink)]"
              title="Hapus pencarian"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Select */}
        <div className="sm:col-span-3">
          <select
            className="w-full px-3 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500 font-medium text-[var(--ink)]"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">Semua Kategori Aset</option>
            <option value="IT Hardware">IT Hardware &amp; Komputer</option>
            <option value="Kendaraan">Kendaraan Operasional</option>
            <option value="Jaringan">Jaringan &amp; Server</option>
            <option value="Percetakan">Mesin &amp; Percetakan</option>
            <option value="Mebel">Mebel &amp; Perabot</option>
          </select>
        </div>

        {/* Branch Select */}
        <div className="sm:col-span-3">
          <select
            className="w-full px-3 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500 font-medium text-[var(--ink)]"
            value={filterBranch}
            onChange={(e) => {
              setFilterBranch(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">Semua Lokasi Cabang</option>
            <option value="Jakarta">Jakarta (Kantor Pusat)</option>
            <option value="Surabaya">Cabang Surabaya</option>
            <option value="Medan">Cabang Medan</option>
            <option value="Makassar">Cabang Makassar</option>
          </select>
        </div>

        {/* Status Select */}
        <div className="sm:col-span-2">
          <select
            className="w-full px-3 py-2 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs focus:outline-none focus:border-sky-500 font-medium text-[var(--ink)]"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">Semua Status</option>
            <option value="Digunakan">Digunakan</option>
            <option value="Tersedia">Tersedia di Gudang</option>
            <option value="Maintenance">Dalam Servis</option>
            <option value="In-Transit">In-Transit</option>
            <option value="Disposed">Disposed / Scrap</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips & Reset */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[var(--ink-soft)] font-medium">Filter Aktif:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] text-[var(--ink)]">
              Cari: &ldquo;{searchQuery}&rdquo;
              <button onClick={() => setSearchQuery("")} className="hover:text-rose-500">
                <X size={12} />
              </button>
            </span>
          )}
          {filterCategory !== "ALL" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] text-[var(--ink)]">
              Kategori: {filterCategory}
              <button onClick={() => setFilterCategory("ALL")} className="hover:text-rose-500">
                <X size={12} />
              </button>
            </span>
          )}
          {filterBranch !== "ALL" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] text-[var(--ink)]">
              Cabang: {filterBranch}
              <button onClick={() => setFilterBranch("ALL")} className="hover:text-rose-500">
                <X size={12} />
              </button>
            </span>
          )}
          {filterStatus !== "ALL" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] text-[var(--ink)]">
              Status: {filterStatus}
              <button onClick={() => setFilterStatus("ALL")} className="hover:text-rose-500">
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline ml-1"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* Batch Notification Banner */}
      {batchNotice && (
        <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs font-semibold text-sky-800 dark:text-sky-200 flex items-center justify-between">
          <span>{batchNotice}</span>
          <button onClick={() => setBatchNotice("")}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main View: Table vs Grid */}
      {paginatedAssets.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center border-2 border-dashed border-[var(--line)] rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--canvas-soft)] mx-auto flex items-center justify-center text-[var(--ink-soft)]">
            <Search size={22} />
          </div>
          <h3 className="text-base font-bold text-[var(--ink)]">
            Tidak Ditemukan Aset yang Cocok
          </h3>
          <p className="text-xs text-[var(--ink-soft)] max-w-md mx-auto">
            Tidak ada unit aset yang memenuhi kriteria filter yang Anda pilih. Coba sesuaikan kata kunci pencarian atau reset filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* Dense Table View */
        <div className="nim-table-wrap">
          <table className="nim-table">
            <thead>
              <tr>
                <th className="w-10 text-center">
                  <button
                    onClick={handleSelectAll}
                    className="p-1 text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    title="Pilih Semua Halaman Ini"
                  >
                    {selectedIds.length === paginatedAssets.length && paginatedAssets.length > 0 ? (
                      <CheckSquare size={16} className="text-sky-600" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => toggleSort("id")}
                    className="flex items-center gap-1 font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  >
                    Kode Aset <ArrowUpDown size={12} />
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => toggleSort("name")}
                    className="flex items-center gap-1 font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  >
                    Nama &amp; Seri <ArrowUpDown size={12} />
                  </button>
                </th>
                <th>Kategori</th>
                <th>Cabang</th>
                <th>Penanggung Jawab</th>
                <th>
                  <button
                    onClick={() => toggleSort("cost")}
                    className="flex items-center gap-1 font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  >
                    Harga Beli <ArrowUpDown size={12} />
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => toggleSort("bookValue")}
                    className="flex items-center gap-1 font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  >
                    Nilai Buku <ArrowUpDown size={12} />
                  </button>
                </th>
                <th>Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssets.map((asset) => {
                const depr = calculateDepreciation(
                  asset.cost,
                  asset.salvage,
                  asset.life,
                  asset.date
                );
                const isSelected = selectedIds.includes(asset.id);

                return (
                  <tr
                    key={asset.id}
                    className={isSelected ? "bg-sky-50/50 dark:bg-sky-950/20" : ""}
                  >
                    <td className="text-center">
                      <button
                        onClick={() => handleToggleSelect(asset.id)}
                        className="p-1 text-[var(--ink-soft)] hover:text-[var(--ink)]"
                      >
                        {isSelected ? (
                          <CheckSquare size={16} className="text-sky-600" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </td>
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
                      <div className="flex items-center gap-1.5 text-xs">
                        {getCategoryIcon(asset.category)}
                        <span>{asset.category}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs font-medium">{asset.branch}</span>
                    </td>
                    <td>
                      <span className="text-xs">
                        {asset.custodian || <em className="text-neutral-400">Belum Ditugaskan</em>}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-mono text-[var(--ink-soft)]">
                        {formatRupiah(asset.cost)}
                      </span>
                    </td>
                    <td>
                      <strong className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {formatRupiah(depr.bookValue)}
                      </strong>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(asset.status)}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedAssetDetail(asset)}
                          className="px-2.5 py-1 rounded-lg bg-[var(--canvas-soft)] hover:bg-[var(--canvas-muted)] text-[11px] font-bold border border-[var(--line)] transition"
                          title="Buka Detail Spesifikasi & Label QR"
                        >
                          Detail &amp; QR
                        </button>
                        <button
                          onClick={() => {
                            setDrawerPanel("bag");
                          }}
                          className="p-1.5 rounded-lg bg-[var(--canvas-soft)] hover:bg-[var(--canvas-muted)] text-[11px] border border-[var(--line)] transition"
                          title="Ajukan Mutasi Unit"
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedAssets.map((asset) => {
            const depr = calculateDepreciation(
              asset.cost,
              asset.salvage,
              asset.life,
              asset.date
            );
            const isSelected = selectedIds.includes(asset.id);

            return (
              <div
                key={asset.id}
                className={`p-4 rounded-2xl border transition space-y-3 relative ${
                  isSelected
                    ? "border-sky-500 bg-sky-50/40 dark:bg-sky-950/20 shadow-sm"
                    : "border-[var(--line)] bg-[var(--canvas)] hover:border-sky-400 hover:shadow-md"
                }`}
              >
                {/* Card Top: Checkbox, ID, Category */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleSelect(asset.id)}
                      className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    >
                      {isSelected ? (
                        <CheckSquare size={16} className="text-sky-600" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      {asset.id}
                    </span>
                  </div>
                  <span className={getStatusBadgeClass(asset.status)}>
                    {asset.status}
                  </span>
                </div>

                {/* Card Title & Specs */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)] line-clamp-1">
                    {asset.name}
                  </h4>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    {asset.brand} &bull; SN: {asset.serial}
                  </p>
                </div>

                {/* Branch & Custodian */}
                <div className="p-2.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-soft)]">Lokasi:</span>
                    <strong className="text-[var(--ink)]">{asset.branch}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--ink-soft)]">Penanggung Jawab:</span>
                    <strong className="text-[var(--ink)] truncate max-w-[150px]">
                      {asset.custodian || "Belum Ditugaskan"}
                    </strong>
                  </div>
                </div>

                {/* Financial Book Value */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--line)]">
                  <div>
                    <span className="text-[11px] text-[var(--ink-soft)] block">Nilai Buku:</span>
                    <strong className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatRupiah(depr.bookValue)}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[var(--ink-soft)] block">Harga Beli:</span>
                    <span className="text-xs font-mono text-[var(--ink-soft)]">
                      {formatRupiah(asset.cost)}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedAssetDetail(asset)}
                    className="flex-1 py-1.5 rounded-xl bg-[var(--canvas-soft)] hover:bg-[var(--canvas-muted)] border border-[var(--line)] text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    Detail &amp; QR
                  </button>
                  <button
                    onClick={() => setDrawerPanel("bag")}
                    className="p-1.5 rounded-xl bg-[var(--canvas-soft)] hover:bg-[var(--canvas-muted)] border border-[var(--line)] text-xs font-bold transition"
                    title="Ajukan Mutasi"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--line)] text-xs">
        <div className="flex items-center gap-2 text-[var(--ink-soft)]">
          <span>Menampilkan</span>
          <select
            className="px-2 py-1 rounded-lg bg-[var(--canvas-soft)] border border-[var(--line)] font-bold text-[var(--ink)]"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>dari <strong>{sortedAssets.length}</strong> unit aset</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-[var(--line)] bg-[var(--canvas-soft)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--canvas-muted)] transition"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="px-3 font-semibold text-[var(--ink)]">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-[var(--line)] bg-[var(--canvas-soft)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--canvas-muted)] transition"
            title="Halaman Selanjutnya"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Floating Batch Action Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[var(--inverse)] text-[var(--inverse-ink)] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 text-xs font-bold border border-[var(--line)]"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>{selectedIds.length} Aset Terpilih</span>
            </div>

            <div className="h-4 w-px bg-white/20" />

            <div className="flex items-center gap-2">
              <button
                onClick={handleBatchPrint}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1.5 transition"
              >
                <Printer size={13} /> Cetak QR ({selectedIds.length})
              </button>
              <button
                onClick={handleBatchExport}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition"
              >
                <Download size={13} /> Ekspor CSV
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="p-1.5 rounded-xl hover:bg-white/10 text-neutral-300 hover:text-white transition"
                title="Batal pilihan"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
