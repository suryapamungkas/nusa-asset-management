"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

export interface NavCategory {
  id: string;
  label: string;
  href: string;
  eyebrows: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  primaryLinks: Array<{
    title: string;
    href: string;
    badge?: string;
  }>;
  secondaryLinks: Array<{
    title: string;
    href: string;
  }>;
  tertiaryLinks: Array<{
    title: string;
    href: string;
  }>;
  bottomLinks?: Array<{
    title: string;
    href: string;
  }>;
  featured?: {
    tag: string;
    title: string;
    subtitle: string;
    image?: string;
    price: string;
    href: string;
  };
}

export const navCategories: NavCategory[] = [
  {
    id: "inventaris",
    label: "Inventaris",
    href: "#inventaris",
    eyebrows: {
      primary: "Katalog & Klasifikasi Aset",
      secondary: "Penempatan Wilayah Cabang",
      tertiary: "Status Kepemilikan & Kondisi",
    },
    primaryLinks: [
      { title: "Semua Inventaris Aset Fisik", href: "#tab-inventory", badge: "524 Unit" },
      { title: "IT Hardware & Laptop Bisnis", href: "#tab-inventory", badge: "215 Unit" },
      { title: "Kendaraan Operasional & Kurir", href: "#tab-inventory" },
      { title: "Jaringan, Firewall & Server", href: "#tab-inventory" },
      { title: "Mesin Cetak & Barcode Thermal", href: "#tab-inventory" },
      { title: "Mebel & Perabot Kantor Ergonomis", href: "#tab-inventory" },
    ],
    bottomLinks: [
      { title: "Unduh Rekap Inventaris (CSV/Excel)", href: "#action-export" },
      { title: "Pencarian Aset Cepat (⌘K)", href: "#action-search" },
    ],
    secondaryLinks: [
      { title: "Kantor Pusat (Jakarta): 242 Unit", href: "#tab-inventory" },
      { title: "Cabang Surabaya: 118 Unit", href: "#tab-inventory" },
      { title: "Cabang Medan: 94 Unit", href: "#tab-inventory" },
      { title: "Cabang Makassar: 70 Unit", href: "#tab-inventory" },
      { title: "Aset dalam Pengiriman (In-Transit)", href: "#tab-transfer" },
    ],
    tertiaryLinks: [
      { title: "Aset Aktif Digunakan (92%)", href: "#tab-inventory" },
      { title: "Tersedia di Gudang Penyimpanan", href: "#tab-inventory" },
      { title: "Dalam Pemeliharaan / Servis (5%)", href: "#tab-maintenance" },
      { title: "Riwayat Penghapusan / Scrap", href: "#tab-disposal" },
    ],
    featured: {
      tag: "TOTAL VALUASI BUKU",
      title: "Rp 3,21 Miliar Terdata",
      subtitle: "Harga perolehan awal Rp 4,85 Miliar tersebar di 4 kantor cabang operasional.",
      price: "524 Unit Fisik",
      href: "#tab-depreciation",
    },
  },
  {
    id: "operasional",
    label: "Operasional",
    href: "#operasional",
    eyebrows: {
      primary: "Aktivitas & Alur Kerja Aset",
      secondary: "Approval & Distribusi",
      tertiary: "Pemeliharaan & Sertifikasi",
    },
    primaryLinks: [
      { title: "Registrasi Aset Baru & Label QR", href: "#tab-register", badge: "Instan" },
      { title: "Pemindai Cepat QR (< 5 Detik)", href: "#tab-scanner", badge: "Live" },
      { title: "Pengajuan & Alur Mutasi Cabang", href: "#tab-transfer", badge: "Approval" },
      { title: "Jadwal Servis Berkala & Maintenance", href: "#tab-maintenance" },
      { title: "Pelepasan & Scrap Aset Rusak", href: "#tab-disposal" },
    ],
    bottomLinks: [
      { title: "Cetak Ulang Label QR Fisik", href: "#tab-inventory" },
      { title: "Panduan SOP Mutasi Barang", href: "#tab-transfer" },
    ],
    secondaryLinks: [
      { title: "Approval Mutasi oleh Manajer", href: "#tab-transfer" },
      { title: "Konfirmasi Penerimaan Cabang Tujuan", href: "#tab-transfer" },
      { title: "Pelacakan Posisi Fisik Real-Time", href: "#tab-scanner" },
      { title: "Pemeriksaan Fisik Triwulanan", href: "#tab-inventory" },
    ],
    tertiaryLinks: [
      { title: "Reminder Servis H-7 Aktif", href: "#tab-maintenance" },
      { title: "Log Penggantian Sparepart & Vendor", href: "#tab-maintenance" },
      { title: "Berita Acara Serah Terima (BAST)", href: "#tab-transfer" },
      { title: "Otorisasi Direktur untuk Scrap", href: "#tab-disposal" },
    ],
    featured: {
      tag: "QR TRACKING SYSTEM",
      title: "Pelacakan < 5 Detik",
      subtitle: "Identifikasi instan spesifikasi, penanggung jawab, dan histori unit fisik di lapangan.",
      price: "100% Terlabel",
      href: "#tab-scanner",
    },
  },
  {
    id: "finansial",
    label: "Finansial & Depresiasi",
    href: "#finansial",
    eyebrows: {
      primary: "Akuntansi Aset Tetap",
      secondary: "Parameter & Masa Manfaat",
      tertiary: "Kepatuhan & Audit Finansial",
    },
    primaryLinks: [
      { title: "Kalkulasi Depresiasi Garis Lurus", href: "#tab-depreciation", badge: "Otomatis" },
      { title: "Rekapitulasi Nilai Buku Terkini", href: "#tab-depreciation" },
      { title: "Akumulasi Penyusutan Berjalan", href: "#tab-depreciation" },
      { title: "Monitoring Nilai Sisa (Salvage Value)", href: "#tab-depreciation" },
    ],
    bottomLinks: [
      { title: "Ekspor Laporan Fiskal Bulanan", href: "#action-export" },
      { title: "Kebijakan Standar Akuntansi PSAK 16", href: "#tab-depreciation" },
    ],
    secondaryLinks: [
      { title: "Aset IT & Komputer (Masa Manfaat 4 Thn)", href: "#tab-depreciation" },
      { title: "Kendaraan Bermotor (Masa Manfaat 8 Thn)", href: "#tab-depreciation" },
      { title: "Server & Jaringan (Masa Manfaat 5 Thn)", href: "#tab-depreciation" },
      { title: "Mebel & Furnitur (Masa Manfaat 5-6 Thn)", href: "#tab-depreciation" },
    ],
    tertiaryLinks: [
      { title: "Perhitungan Beban Penyusutan Bulanan", href: "#tab-depreciation" },
      { title: "Audit Nilai Residu Aset Rusak", href: "#tab-disposal" },
      { title: "Rekonsiliasi Sub-Ledger Aset Tetap", href: "#tab-depreciation" },
    ],
    featured: {
      tag: "FORMULA GARIS LURUS",
      title: "Penyusutan Presisi",
      subtitle: "(Harga Perolehan - Nilai Sisa) / Masa Manfaat. Terhitung otomatis setiap bulan berjalan.",
      price: "PSAK 16 Baseline",
      href: "#tab-depreciation",
    },
  },
];

interface MegaMenuProps {
  activeCategory: string | null;
  onClose: () => void;
  onNavigate?: (href: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MegaMenu({
  activeCategory,
  onClose,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  const current = navCategories.find((cat) => cat.id === activeCategory);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <AnimatePresence>
      {activeCategory && current && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="mega-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mega Menu Container */}
          <motion.div
            className="mega-menu-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            role="region"
            aria-label={`Menu ${current.label}`}
          >
            <div className="mega-menu-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="mega-menu-grid"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Column 1: Primary Links */}
                  <div className="mega-col mega-col-primary">
                    <p className="mega-eyebrow">{current.eyebrows.primary}</p>
                    <ul className="mega-primary-list">
                      {current.primaryLinks.map((item, idx) => (
                        <motion.li
                          key={item.title}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.16, delay: idx * 0.015 }}
                        >
                          <a
                            href={item.href}
                            className="mega-primary-link"
                            onClick={(e) => handleClick(e, item.href)}
                          >
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="mega-badge">{item.badge}</span>
                            )}
                          </a>
                        </motion.li>
                      ))}
                    </ul>

                    {current.bottomLinks && current.bottomLinks.length > 0 && (
                      <div className="mega-bottom-links">
                        {current.bottomLinks.map((link) => (
                          <a
                            key={link.title}
                            href={link.href}
                            className="mega-bottom-link"
                            onClick={(e) => handleClick(e, link.href)}
                          >
                            <span>{link.title}</span>
                            <ChevronRight className="mega-arrow-icon" size={14} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Column 2: Secondary Links */}
                  <div className="mega-col mega-col-secondary">
                    <p className="mega-eyebrow">{current.eyebrows.secondary}</p>
                    <ul className="mega-secondary-list">
                      {current.secondaryLinks.map((item, idx) => (
                        <motion.li
                          key={item.title}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.16, delay: idx * 0.015 + 0.03 }}
                        >
                          <a
                            href={item.href}
                            className="mega-secondary-link"
                            onClick={(e) => handleClick(e, item.href)}
                          >
                            {item.title}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Tertiary Links */}
                  <div className="mega-col mega-col-tertiary">
                    <p className="mega-eyebrow">{current.eyebrows.tertiary}</p>
                    <ul className="mega-secondary-list">
                      {current.tertiaryLinks.map((item, idx) => (
                        <motion.li
                          key={item.title}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.16, delay: idx * 0.015 + 0.06 }}
                        >
                          <a
                            href={item.href}
                            className="mega-secondary-link"
                            onClick={(e) => handleClick(e, item.href)}
                          >
                            {item.title}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 4: Featured Bento Card */}
                  {current.featured && (
                    <div className="mega-col mega-col-featured">
                      <p className="mega-eyebrow">Highlight &amp; Valuasi</p>
                      <div
                        className="mega-featured-card group cursor-pointer"
                        onClick={() => {
                          onClose();
                          if (onNavigate && current.featured?.href) {
                            onNavigate(current.featured.href);
                          }
                        }}
                      >
                        <div className="mega-featured-header">
                          <span className="mega-featured-tag">
                            <Sparkles size={11} className="inline mr-1" />
                            {current.featured.tag}
                          </span>
                        </div>
                        <h4 className="mega-featured-title">
                          {current.featured.title}
                        </h4>
                        <p className="mega-featured-subtitle">
                          {current.featured.subtitle}
                        </p>
                        <div className="mega-featured-footer">
                          <span className="mega-featured-price font-semibold text-sky-600 dark:text-sky-400">
                            {current.featured.price}
                          </span>
                          <span className="mega-featured-cta">
                            Lihat Modul <ArrowRight size={13} className="inline ml-0.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
