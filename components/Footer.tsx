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
            3. Seluruh alur mutasi, pemeliharaan preventif, dan penghapusan aset tunduk pada matriks RACI dan Change Control Board (CCB) proyek.
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
            <h3>Dokumentasi PMO (MPIT)</h3>
            <ul>
              <li><a href="#tab-pmo-charter">Project Charter & Milestone</a></li>
              <li><a href="#tab-pmo-wbs">WBS Level 3 (7 Fasa Proyek)</a></li>
              <li><a href="#tab-pmo-schedule">Jadwal Proyek Gantt (12 Minggu)</a></li>
              <li><a href="#tab-pmo-team">RACI Matrix 5 Peran Tim</a></li>
              <li><a href="#tab-pmo-budget">Rencana Anggaran (Rp 168.5M)</a></li>
              <li><a href="#tab-pmo-risk">Risk Register & Heatmap 5x5</a></li>
              <li><a href="#tab-pmo-qa">10 Quality Gate Criteria</a></li>
            </ul>

            <h3 className="mt-4">Rencana Manajemen</h3>
            <ul>
              <li><a href="#tab-pmo-comm">Communication Management Plan</a></li>
              <li><a href="#tab-pmo-procurement">Procurement Management Plan</a></li>
              <li><a href="#tab-pmo-integration">Integration Management Plan</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Standar & Tata Kelola</h3>
            <ul>
              <li><a href="#tab-pmo-overview">PMBOK 7th Edition Guide</a></li>
              <li><a href="#tab-pmo-integration">Agile Scrum 2-Week Sprints</a></li>
              <li><a href="#tab-pmo-qa">UAT Test Runner (8 Skenario)</a></li>
              <li><a href="#tab-pmo-overview">Standar Akuntansi PSAK 16</a></li>
              <li><a href="#tab-pmo-risk">ISO 31000 Risk Management</a></li>
            </ul>

            <h3 className="mt-4">Tentang Perusahaan</h3>
            <ul>
              <li><a href="#tab-pmo-overview">PT Nusa Integra Mandiri</a></li>
              <li><a href="#tab-pmo-overview">Profil Bisnis & AS-IS vs TO-BE</a></li>
              <li><a href="#tab-pmo-team">Tim Pengembang</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="footer-legal">
          <div className="footer-legal-copy">
            Hak Cipta &copy; 2026 PT Nusa Integra Mandiri. Dikembangkan oleh <strong>Nur Hidayat Surya Pamungkas</strong>. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <ul className="footer-legal-links">
            <li><a href="#tab-pmo-overview">Kebijakan Privasi</a></li>
            <li><a href="#tab-pmo-charter">Ketentuan Proyek</a></li>
            <li><a href="#tab-pmo-qa">Quality Assurance</a></li>
            <li><a href="#tab-pmo-overview">Peta Situs Sistem</a></li>
          </ul>
          <div className="footer-legal-region">
            Indonesia (Bahasa Indonesia) &bull; Enterprise Edition v2.4
          </div>
        </div>
      </div>
    </footer>
  );
}
