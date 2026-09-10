# Sistem Manajemen Aset Terpadu Enterprise — PT Nusa Integra Mandiri

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com)

Aplikasi web modern Enterprise Asset Management (EAM) berbasis **Next.js 16 (App Router + Turbopack)** dengan estetika desain *Apple-Inspired Experience*. Platform ini dirancang untuk memodernisasi tata kelola dan pencatatan siklus hidup aset fisik di **PT Nusa Integra Mandiri**, mencakup kantor pusat Jakarta serta 3 kantor cabang regional (Surabaya, Medan, dan Makassar).

---

## 👤 Author & Owner Information

- **Owner / Author**: **Nur Hidayat Surya Pamungkas**
- **Institusi / Entitas**: PT Nusa Integra Mandiri
- **Lisensi Proyek**: [MIT License](LICENSE) (Copyright &copy; 2026 Nur Hidayat Surya Pamungkas)

---

## 🚀 Fitur Unggulan Sistem

Platform ini mengintegrasikan dua domain utama: **Operasional Manajemen Aset** dan **Dokumentasi Tata Kelola PMO (Project Management Office)**:

### 1. Modul Aplikasi Manajemen Aset (Operational EAM)
- **Dashboard Eksekutif**: Ringkasan KPI real-time (Total Aset, Nilai Perolehan, Nilai Buku Terkini, Akumulasi Depresiasi, Distribusi Regional, Status Aset Aktif/Maintenance/Disposed).
- **Inventaris Aset Multi-Cabang**: Pencarian cerdas instan, filter kategori (*IT Hardware, Kendaraan, Mesin & Peralatan, Furnitur & Perlengkapan*), filter cabang (*Jakarta, Surabaya, Medan, Makassar*), dan modal detail komprehensif.
- **Registrasi Aset Terstandarisasi**: Form input terstruktur dengan perhitungan otomatis estimasi beban penyusutan tahunan, masa manfaat, dan penugasan custodian resmi.
- **Mesin Pelacak QR Code & Label Generator**: Simulasi pemindaian QR code cepat (<5 detik) dan generator stiker kode QR SVG vektor untuk penandaan fisik inventaris.
- **Alur Kerja Mutasi Antar-Cabang (Asset Transfer)**: Sistem permohonan mutasi aset dengan validasi approval berjenjang antar kantor operasional.
- **Jadwal Pemeliharaan Preventif (Maintenance)**: Monitoring riwayat servis, jadwal berkala, estimasi biaya pemeliharaan, dan nama teknisi/vendor.
- **Kalkulator Depresiasi Nilai Buku (PSAK 16)**: Implementasi metode Garis Lurus (*Straight-Line Depreciation*) otomatis setiap akhir periode pelaporan.
- **Pelepasan & Penghapusan Aset (Disposal)**: Pencatatan formal pelepasan aset (penjualan/lelang, rusak total, usang) beserta nilai residu dan alasan penghapusan.
- **UAT Interactive Test Runner**: 8 skenario pengujian Acceptance Criteria end-to-end dengan verifikasi status *PASS (100%)*.

### 2. Modul Tata Kelola PMO (PMBOK 7th Edition & Agile Governance)
- **Konteks Proyek & Analisis Gap**: Profil bisnis PT Nusa Integra Mandiri, komparasi kondisi *AS-IS* vs *TO-BE*.
- **Struktur Tim & RACI Matrix**: Pembagian peran 5 personil inti PMO (*PM, BA, SA, CRRM, QDM*) dan penugasan deliverables.
- **Project Charter**: Tujuan terukur (SMART Objectives), batasan ruang lingkup (*In-Scope & Out-of-Scope*), dan stakeholder utama.
- **WBS & Kamus WBS**: Penguraian paket kerja bertingkat dari inisiasi hingga serah terima operasional.
- **Jadwal Proyek (Gantt & Milestones)**: Timeline implementasi terukur selama 12 minggu.
- **Anggaran & Baseline Biaya**: Alokasi anggaran Rp 168.500.000 dengan rincian biaya langsung dan cadangan kontinjensi (*Contingency Reserve 10%*).
- **Manajemen Risiko (Risk Register 5x5)**: Matriks risiko R-001 s.d. R-008 mencakup resistensi cabang, deviasi integrasi, hingga strategi mitigasi.
- **Quality Assurance & 10 Quality Gates**: Standar penerimaan kualitas perangkat lunak enterprise.
- **Rencana Manajemen Komunikasi & Pengadaan**: Matriks distribusi informasi dan seleksi vendor pengadaan perangkat keras QR.
- **Manajemen Integrasi & Change Control (CCB)**: Tata kelola persetujuan perubahan ruang lingkup melalui *Change Control Board*.

---

## 🛠️ Stack Teknologi

| Layer | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 16.3.3 (Turbopack) | App Router, React Server/Client Components |
| **Library UI** | React 19.2.8 | Modern Hooks & Transitions |
| **Bahasa** | TypeScript 7.0.2 | Tipe data kuat & pengecekan statis |
| **Styling** | Tailwind CSS v4 & PostCSS | Utilitas styling terkini dengan dark mode |
| **Animasi** | Framer Motion 13.1.1 | Transisi layout & drawer interaktif |
| **Ikonografi** | Lucide React | Ikon modern, clean, dan konsisten |

---

## 📁 Struktur Direktori Proyek

```text
nusa-asset-management/
├── app/
│   ├── globals.css          # Styling global, token warna, Apple glassmorphism
│   ├── layout.tsx           # Layout dasar & metadata SEO / author
│   └── page.tsx             # Halaman utama dengan dual-mode state
├── components/
│   ├── AssetDetailModal.tsx # Modal detail informasi aset fisik
│   ├── AssetDrawers.tsx     # Slide-out drawer (Search, Mutasi, Profil Role)
│   ├── Footer.tsx           # Footer informasi tata kelola, hak cipta & tim
│   ├── MegaMenu.tsx         # Navigasi sticky interaktif
│   ├── NimLogo.tsx          # Logo korporat PT Nusa Integra Mandiri
│   └── views/               # Komponen tampilan per modul
│       ├── DashboardTab.tsx
│       ├── InventoryTab.tsx
│       ├── RegisterTab.tsx
│       ├── ScannerTab.tsx
│       ├── TransferTab.tsx
│       ├── MaintenanceTab.tsx
│       ├── DepreciationTab.tsx
│       ├── DisposalTab.tsx
│       ├── UatRunnerTab.tsx
│       └── PmoTabs.tsx
├── lib/
│   ├── assetData.ts         # Dataset dummy aset, formula depresiasi PSAK 16, generator QR
│   ├── pmoData.ts           # Dataset tata kelola PMO, profil tim, charter, WBS, risiko
│   └── types.ts             # Definisi TypeScript interface & enum
├── public/
│   └── nim_logo.jpg         # Asset gambar identitas korporat
├── .gitignore               # Aturan pengabaian file Git
├── LICENSE                  # Lisensi MIT (Hak Cipta: Nur Hidayat Surya Pamungkas)
├── package.json             # Konfigurasi dependensi dan skrip proyek
├── README.md                # Dokumentasi resmi proyek
└── tsconfig.json            # Konfigurasi TypeScript compiler
```

---

## ⚡ Panduan Instalasi & Menjalankan Lokal

### Prasyarat:
- **Node.js**: Versi `>= 18.18.0` atau `>= 20.x` (Direkomendasikan Node.js v20+)
- **npm**: Versi `>= 9.x`

### Langkah-langkah:

1. **Clone repositori (atau buka direktori proyek)**:
   ```bash
   cd nusa-asset-management
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Development Mode)**:
   ```bash
   npm run dev
   ```
   Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

4. **Validasi tipe data & linting**:
   ```bash
   npm run lint
   ```

5. **Build produksi**:
   ```bash
   npm run build
   ```

6. **Menjalankan hasil build**:
   ```bash
   npm run start
   ```

---

## 🚢 Panduan Deploy / Push ke GitHub

Ikuti langkah-langkah berikut untuk mengunggah proyek ini ke repositori GitHub Anda:

### 1. Inisialisasi Git Lokal (jika belum ada)
```bash
git init
```

### 2. Tambahkan Semua File dan Buat Komitmen Pertama
```bash
git add .
git commit -m "feat: inisialisasi awal sistem manajemen aset enterprise PT Nusa Integra Mandiri v2.0"
```

### 3. Buat Repositori Baru di GitHub
1. Masuk ke akun GitHub Anda di [https://github.com/new](https://github.com/new).
2. Beri nama repositori (misalnya: `nusa-asset-management` atau `manajemen-aset-perusahaan`).
3. Biarkan opsi *"Initialize this repository with a README"* tidak dicentang (karena file sudah dibuat secara lokal).
4. Klik tombol **Create repository**.

### 4. Hubungkan Repositori Lokal ke GitHub dan Push
```bash
# Ubah branch utama menjadi main
git branch -M main

# Tambahkan URL remote repositori Anda
git remote add origin https://github.com/<username-anda>/<nama-repo>.git

# Unggah (push) branch main ke GitHub
git push -u origin main
```

---

## 🌐 Panduan Deploy ke Cloud (Vercel / Netlify)

Aplikasi Next.js ini sudah diuji dan 100% siap untuk dideploy langsung ke **Vercel**:

1. Kunjungi [Vercel](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Klik **Add New Project** lalu pilih repositori GitHub yang baru saja di-push.
3. Vercel akan secara otomatis mendeteksi framework **Next.js**.
4. Klik tombol **Deploy**.
5. Website akan selesai dideploy dalam 1-2 menit dengan URL publik otomatis (misal: `https://nusa-asset-management.vercel.app`).

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT License** — lihat berkas [LICENSE](LICENSE) untuk perincian lengkap.

Hak Cipta &copy; 2026 **Nur Hidayat Surya Pamungkas**. Seluruh hak cipta dilindungi undang-undang.
