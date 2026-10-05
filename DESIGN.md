# DESIGN.md: Arah Visual & Desain Sistem

> Proyek: Sistem Manajemen Aset Terpadu Enterprise: PT Nusa Integra Mandiri  
> Pemilik / Author: Nur Hidayat Surya Pamungkas  
> Arah Gaya: Modern Enterprise & Sleek Precision  
> Dials: ENERGY 2 / RHYTHM 2 / MOTION 2  

---

## 1. Identitas & Karakter Visual

Sistem Manajemen Aset PT Nusa Integra Mandiri dirancang sebagai platform cockpit operasional aset kelas enterprise. Desain mengutamakan kejelasan data (data-clarity), presisi tata letak, kecepatan akses informasi lapangan, serta transisi interaktif yang halus dan responsif.

- **Fokus Utama**: Dashboard operasional aset terdistribusi (Jakarta, Surabaya, Medan, Makassar).
- **Nuansa (Mood)**: Modern, presisi, kokoh, profesional, andal, dan manusiawi.
- **Karakter Tipografi**: Font modern tanpa embel-embel, hierarki teks tegas, angka monospaced proporsional untuk valuasi finansial.

---

## 2. Dials antislop

| Dial | Level | Implementasi Nyata |
|---|---|---|
| **ENERGY** | **2 (Balanced)** | Tampilan berkelas korporat modern (standar enterprise SaaS). Elegan tanpa ornamen berlebih; percaya diri dan tajam. |
| **RHYTHM** | **2 (Varied Flow)** | Komposisi asimetris terstruktur: hero metric spotlight, komparasi visual cabang, card visual + tabel data padat yang saling melengkapi. |
| **MOTION** | **2 (Interactive)** | Transisi tab mulus via Framer Motion, micro-interaction hover, live scanner beam, animasi progress bar, modal & drawer geser responsif. |

---

## 3. Palet Warna (Color System)

Mengikuti aturan R-29 (maksimal 2-3 warna inti + 1 aksen terarah), dengan rasio kontras WCAG AA (R-25):

### Mode Terang (Light Mode)
- **Base Canvas**: `#f8fafc` (Slate 50) dengan kartu `#ffffff`
- **Tinta / Teks Utama**: `#0f172a` (Slate 900) (kontras ratio 16.5:1 terhadap canvas, lulus AA & AAA)
- **Tinta Lembut**: `#475569` (Slate 600) (kontras ratio 5.2:1 terhadap putih, lulus AA)
- **Garis & Batas**: `rgba(15, 23, 42, 0.08)` (Halus, tegas)
- **Aksen Primer**: `#0284c7` (Sky/Cobalt 600) & `#2563eb` (Blue 600)
- **Status Fungsional**:
  - Positif / Normal: `#059669` (Emerald 600)
  - Peringatan / Servis: `#d97706` (Amber 600)
  - Kritis / Pending: `#e11d48` (Rose 600)

### Mode Malam (Night / Dark Mode)
- **Base Canvas**: `#090d16` (Deep Obsidian Slate) dengan kartu `#111827` (Slate 900)
- **Tinta / Teks Utama**: `#f8fafc` (Slate 50) (kontras ratio 17.2:1)
- **Tinta Lembut**: `#94a3b8` (Slate 400) (kontras ratio 6.4:1)
- **Garis & Batas**: `rgba(255, 255, 255, 0.08)`
- **Aksen Primer**: `#38bdf8` (Sky 400) & `#60a5fa` (Blue 400)
- **Status Fungsional**:
  - Positif: `#34d399` (Emerald 400)
  - Peringatan: `#fbbf24` (Amber 400)
  - Kritis: `#fb7185` (Rose 400)

---

## 4. Standar Craftsmanship & antislop

1. **Bebas Tanda Em Dash (R-02)**: Seluruh teks antarmuka ditulis dalam Bahasa Indonesia alami tanpa karakter em dash.
2. **Keterbacaan & Kontras (R-25)**: Semua pasangan warna teks dan latar belakang memenuhi standar WCAG AA (minimal 4.5:1 untuk teks normal).
3. **Interaktivitas Nyata (R-26)**: Tidak ada tombol mati atau tautan hampa. Setiap tombol memiliki tindakan (buka modal, filter, submit, ganti status, navigasi tab).
4. **Respon Bergerak & Multistate (R-27)**: Semua tampilan data menyediakan Empty State interaktif, Loading State, dan feedback status aksi.
5. **Aksesibilitas Keyboard (R-32)**: Semua elemen interaktif dapat diakses via `Tab`, diaktifkan via `Enter`/`Space`, dan modal/drawer ditutup via tombol `Escape`.
6. **Responsivitas Ponsel (R-03)**: Layout mengalir dinamis dari layar seluler (360px+) hingga monitor lebar (1440px+) tanpa overflow horizontal.
