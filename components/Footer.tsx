"use client";

import React from "react";
import { NimLogo } from "@/components/NimLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-[var(--line)] mb-6">
          <NimLogo size={34} showText={true} />
        </div>

        {/* Footnotes / Disclaimers (Apple Style) */}
        <div className="footer-disclaimers">
          <p>
            1. Sistem Manajemen Aset Perusahaan PT Nusa Integra Mandiri mengelola data 524 unit aset fisik terdistribusi di Kantor Pusat Jakarta serta tiga kantor cabang operasional (Surabaya, Medan, Makassar).
          </p>
          <p>
            2. Perhitungan depresiasi finansial menggunakan metode garis lurus (*straight-line depreciation*) sesuai Standar Akuntansi Keuangan (PSAK 16) dengan parameter nilai residu dan masa manfaat terstandarisasi.
          </p>
          <p>
            3. Seluruh alur mutasi, pemeliharaan preventif, dan pelepasan aset tercatat dalam log audit sistem operasional secara real-time.
          </p>
        </div>

        {/* Multi-Column Apple Directory */}
        <div className="footer-directory">
          <div className="footer-col">
            <h3>Modul Manajemen Aset</h3>
            <ul>
              <li><a href="#tab-dashboard">Dashboard & Metrik Eksekutif</a></li>
              <li><a href="#tab-inventory">Katalog Inventaris 524 Aset</a></li>
              <li><a href="#tab-register">Registrasi Aset & Generate QR</a></li>
              <li><a href="#tab-scanner">Pemindai QR Cepat (&lt; 5s)</a></li>
              <li><a href="#tab-transfer">Workflow Mutasi Antar-Cabang</a></li>
              <li><a href="#tab-maintenance">Jadwal Servis Berkala & Reminder</a></li>
              <li><a href="#tab-depreciation">Kalkulator Depresiasi Nilai Buku</a></li>
            </ul>

            <h3 className="mt-4">Operasional Lapangan</h3>
            <ul>
              <li><a href="#tab-scanner">Pemeriksaan Barcode / QR Fisik</a></li>
              <li><a href="#tab-transfer">Berita Acara Serah Terima (BAST)</a></li>
              <li><a href="#tab-disposal">Penghapusan & Scrap Aset Rusak</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Wilayah Operasional</h3>
            <ul>
              <li><a href="#tab-inventory">Kantor Pusat: Jakarta (242 Unit)</a></li>
              <li><a href="#tab-inventory">Cabang: Surabaya (118 Unit)</a></li>
              <li><a href="#tab-inventory">Cabang: Medan (94 Unit)</a></li>
              <li><a href="#tab-inventory">Cabang: Makassar (70 Unit)</a></li>
              <li><a href="#tab-transfer">Aset Transit Antar-Pulau</a></li>
            </ul>

            <h3 className="mt-4">Kategori Aset</h3>
            <ul>
              <li><a href="#tab-inventory">IT Hardware (Laptop & PC)</a></li>
              <li><a href="#tab-inventory">Kendaraan Operasional & Kurir</a></li>
              <li><a href="#tab-inventory">Jaringan, Firewall & Server</a></li>
              <li><a href="#tab-inventory">Mesin & Percetakan Dokumen</a></li>
              <li><a href="#tab-inventory">Mebel & Perabot Kantor</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Layanan & Fitur Sistem</h3>
            <ul>
              <li><a href="#tab-uat-runner">UAT Test Runner (8 Skenario)</a></li>
              <li><a href="#tab-depreciation">Kalkulasi Garis Lurus (PSAK 16)</a></li>
              <li><a href="#action-export">Ekspor Rekapitulasi CSV</a></li>
              <li><a href="#action-search">Pencarian Cepat Aset (⌘K)</a></li>
              <li><a href="#tab-scanner">Verifikasi Label QR Lapangan</a></li>
              <li><a href="#tab-transfer">Permohonan Mutasi Multi-Cabang</a></li>
              <li><a href="#tab-maintenance">Kalender Pemeliharaan Rutin</a></li>
            </ul>

            <h3 className="mt-4">Pelepasan & Audit</h3>
            <ul>
              <li><a href="#tab-disposal">Log Penghapusan / Scrap Aset</a></li>
              <li><a href="#tab-depreciation">Audit Nilai Sisa (Salvage)</a></li>
              <li><a href="#tab-inventory">Rekonsiliasi Fisik Inventaris</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Standar Operasional</h3>
            <ul>
              <li><a href="#tab-depreciation">Standar Akuntansi PSAK 16</a></li>
              <li><a href="#tab-transfer">SOP Mutasi Antar-Cabang</a></li>
              <li><a href="#tab-maintenance">Pemeliharaan Preventif Terjadwal</a></li>
              <li><a href="#tab-inventory">Otorisasi Custodian Resmi</a></li>
              <li><a href="#tab-uat-runner">Verifikasi Acceptance Test</a></li>
            </ul>

            <h3 className="mt-4">Tentang Perusahaan</h3>
            <ul>
              <li><a href="#tab-dashboard">PT Nusa Integra Mandiri</a></li>
              <li><a href="#tab-inventory">Distributor Jasa & Logistik</a></li>
              <li><a href="#tab-dashboard">Enterprise Asset Portal v2.4</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="footer-legal">
          <div className="footer-legal-copy">
            Hak Cipta &copy; 2026 PT Nusa Integra Mandiri. Dikembangkan oleh <strong>Nur Hidayat Surya Pamungkas</strong>. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <ul className="footer-legal-links">
            <li><a href="#tab-inventory">Kebijakan Inventaris</a></li>
            <li><a href="#tab-dashboard">Ketentuan Sistem</a></li>
            <li><a href="#tab-uat-runner">Quality Assurance</a></li>
            <li><a href="#tab-dashboard">Peta Situs Sistem</a></li>
          </ul>
          <div className="footer-legal-region">
            Indonesia (Bahasa Indonesia) &bull; Enterprise Edition v2.4
          </div>
        </div>
      </div>
    </footer>
  );
}
