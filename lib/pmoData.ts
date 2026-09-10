export const PMO_PROFILE = {
  companyName: "PT Nusa Integra Mandiri",
  businessType: "Distributor Jasa & Logistik Skala Menengah",
  scale: "1 Kantor Pusat (Jakarta) & 3 Kantor Cabang (Surabaya, Medan, Makassar)",
  assetVolume: "~524 Unit Aset Fisik Aktif Terdata",
  problemStatement: "Pencatatan aset manual berbasis spreadsheet terpisah per cabang, hilangnya riwayat custodian, ketidakpastian histori pemeliharaan, serta tingginya risiko double-allocation dan aset hilang.",
  targetCondition: "Sistem Manajemen Aset Berbasis Web terpusat dengan QR Code tracking (< 5s), workflow persetujuan mutasi antar-cabang, reminder pemeliharaan berkala, serta pelaporan otomatis depresiasi nilai buku secara real-time."
};

export const PMO_TEAM = [
  {
    role: "Project Manager (PM)",
    name: "Ahmad Fauzi, PMP",
    focus: "Integration, Scope, Schedule & Overall Project Governance",
    deliverables: "Project Charter, WBS & Dictionary, Project Schedule (Gantt), Integrated Change Control"
  },
  {
    role: "Business / Process Analyst (BA)",
    name: "Siti Rahmania, CBAP",
    focus: "Process Modeling (AS-IS/TO-BE), Business Requirements, KPI",
    deliverables: "BPMN Diagram, BRD (Business Requirement Document), Gap Analysis, KPI Framework"
  },
  {
    role: "",
    name: "Nur Hidayat Surya Pamungkas",
    focus: "System Requirements (SRS), Architecture, UI/UX Wireframe, Database & API",
    deliverables: "SRS Document, ERD & Schema, QR Code Engine Architecture, REST API Specification"
  },
  {
    role: "Cost, Risk & Resource Manager (CRRM)",
    name: "Dimas Wicaksono, CRA",
    focus: "Cost Budgeting, Risk Management Plan, Risk Register 5x5, RACI Matrix",
    deliverables: "Cost Baseline (Rp 168.5M), Risk Register (R-001 - R-008), RACI Matrix, Contingency Reserve"
  },
  {
    role: "Quality & Documentation Manager (QDM)",
    name: "Anisa Larasati, CQA",
    focus: "Quality Management Plan, UAT Test Cases, Change Management, Final Governance",
    deliverables: "10 Quality Gate Criteria, 8 Skenario UAT (Pass Rate 100%), User Training Manual, Final Audit"
  }
];

export const PMO_CHARTER = {
  title: "Implementasi Sistem Manajemen Aset Perusahaan Berbasis Web Terintegrasi",
  sponsor: "Direktur Utama — Ir. H. Bambang Soediro, M.M.",
  stakeholders: [
    "Direktur Utama (Project Sponsor)",
    "Kepala Departemen IT (Technical Champion)",
    "Manajer Operasional & Logistik Aset (Business Process Owner)",
    "Manajer Keuangan (Financial Approver)",
    "Kepala Cabang Surabaya, Medan, Makassar (Regional Custodians)"
  ],
  smartObjectives: [
    "Memusatkan 100% pencatatan data aset fisik (524 unit) ke dalam sistem terintegrasi dalam waktu 12 minggu.",
    "Mengurangi waktu pelacakan/pencarian lokasi fisik aset dari rata-rata 3 hari menjadi kurang dari 5 menit via QR Code.",
    "Menurunkan tingkat ketidaksesuaian/kehilangan pencatatan aset inventaris hingga 0% saat rekonsiliasi triwulanan.",
    "Mengotomatiskan perhitungan depresiasi nilai buku aset metode garis lurus setiap penutupan buku bulanan."
  ],
  inScope: [
    "Asset Registration, Categorization, and Batch Import",
    "QR Code Generation & Dynamic Scanner Lookup (< 5s)",
    "Asset Assignment, Transfer / Mutasi Approval Workflow",
    "Preventive Maintenance & Repair Cost Logging",
    "Straight-Line Financial Depreciation Engine",
    "Asset Disposal & Scrap Decommissioning",
    "Executive Dashboard & Real-Time Branch Visual Distribution",
    "Role-Based Access Control (Admin, Manajer, Kepala Cabang, Custodian)"
  ],
  outOfScope: [
    "Pengadaan barang baru skala enterprise (Procurement Tender e-Katalog)",
    "Sistem Payroll / HRIS terintegrasi penuh",
    "General Ledger Akuntansi tingkat lanjut (hanya sub-ledger aset tetap)",
    "Aplikasi mobile native iOS/Android (diimplementasikan via Progressive Web App responsif)",
    "Manajemen barang habis pakai harian (Consumables/ATK kantor)"
  ],
  milestones: [
    { code: "M1", name: "Project Charter & Kick-off Approval", target: "Minggu 1", status: "Completed" },
    { code: "M2", name: "Requirement & Process Model Signed-Off", target: "Minggu 3", status: "Completed" },
    { code: "M3", name: "System Design & Architecture Finalized", target: "Minggu 6", status: "Completed" },
    { code: "M4", name: "Core System Development & Internal Testing Complete", target: "Minggu 9", status: "Completed" },
    { code: "M5", name: "User Acceptance Testing (UAT) & Regional Training Done", target: "Minggu 11", status: "Completed" },
    { code: "M6", name: "System Go-Live Cutover & Project Handover", target: "Minggu 12", status: "Completed" }
  ]
};

export const PMO_WBS = [
  { code: "1.0", title: "Project Management & Governance", pic: "PM", duration: "12 Minggu", deliverable: "Charter, Project Plan, Status Reports, Project Closure Handover" },
  { code: "1.1", title: "Project Initiation & Charter Sign-off", pic: "PM", duration: "1 Minggu", deliverable: "Approved Project Charter" },
  { code: "1.2", title: "Detailed Scope, Schedule & Cost Planning", pic: "PM & CRRM", duration: "2 Minggu", deliverable: "Project Baseline Management Plan" },
  { code: "1.3", title: "Execution Control & Stakeholder Governance", pic: "PM", duration: "8 Minggu", deliverable: "Weekly Status & Variance Reports" },
  { code: "1.4", title: "Project Closeout & Final Handover", pic: "PM & QDM", duration: "1 Minggu", deliverable: "Handover Certificate & Final Audit" },
  { code: "2.0", title: "Business Process Analysis & Modeling", pic: "BA", duration: "3 Minggu", deliverable: "AS-IS/TO-BE BPMN, BRD, GAP Analysis" },
  { code: "2.1", title: "AS-IS Asset Workflow & Pain-point Mapping", pic: "BA", duration: "1 Minggu", deliverable: "AS-IS Process Map" },
  { code: "2.2", title: "Regional Gap Analysis & Policy Alignment", pic: "BA", duration: "1 Minggu", deliverable: "GAP Analysis Report" },
  { code: "2.3", title: "TO-BE Centralized Asset Workflow Design", pic: "BA", duration: "1 Minggu", deliverable: "Signed-off TO-BE Process Blueprint" },
  { code: "3.0", title: "System Requirements & Architecture Design", pic: "SA", duration: "3 Minggu", deliverable: "SRS, High-Fidelity UI Wireframe, DB Schema" },
  { code: "3.1", title: "System Requirements Specification (SRS)", pic: "SA", duration: "1 Minggu", deliverable: "Approved SRS Document" },
  { code: "3.2", title: "UI/UX High-Fidelity Prototype (Apple Style)", pic: "SA", duration: "1 Minggu", deliverable: "Interactive Design System" },
  { code: "3.3", title: "Database Architecture & QR Engine Spec", pic: "SA", duration: "1 Minggu", deliverable: "Relational Schema & QR Algorithm" },
  { code: "4.0", title: "System Development & Integration", pic: "SA & Dev", duration: "4 Minggu", deliverable: "Working Integrated Web Application" },
  { code: "4.1", title: "Asset Core Registry & QR Generator Module", pic: "SA", duration: "1 Minggu", deliverable: "Asset Catalog & QR Generator" },
  { code: "4.2", title: "Transfer & Multi-Branch Approval Module", pic: "SA", duration: "1 Minggu", deliverable: "Mutation Workflow Engine" },
  { code: "4.3", title: "Maintenance & Straight-Line Depreciation Engine", pic: "SA", duration: "1 Minggu", deliverable: "Depreciation & Service Module" },
  { code: "4.4", title: "Executive Dashboard, Bento Grid & Analytics", pic: "SA", duration: "1 Minggu", deliverable: "Real-Time Dashboard & Reporting" },
  { code: "5.0", title: "Quality Assurance & User Acceptance Testing", pic: "QDM", duration: "2 Minggu", deliverable: "UAT Sign-Off & Test Log 100% Pass" },
  { code: "5.1", title: "Functional & Security Vulnerability Testing", pic: "QDM", duration: "1 Minggu", deliverable: "QA Defect Clearance Report" },
  { code: "5.2", title: "User Acceptance Testing (UAT 8 Scenarios)", pic: "QDM & Users", duration: "1 Minggu", deliverable: "Approved UAT Sign-Off Certificate" },
  { code: "6.0", title: "Deployment, Data Migration & Regional Training", pic: "Tim Proyek", duration: "2 Minggu", deliverable: "Data Migration Verified, Staff Certified" },
  { code: "6.1", title: "Spreadsheet Data Cleansing & DB Migration", pic: "BA & SA", duration: "1 Minggu", deliverable: "524 Verified Assets in Database" },
  { code: "6.2", title: "Regional User Training & Physical QR Labeling", pic: "QDM & PM", duration: "1 Minggu", deliverable: "100% Trained Staff & Labeled Assets" },
  { code: "6.3", title: "Go-Live Cutover to Production Cloud", pic: "SA & PM", duration: "0.5 Minggu", deliverable: "Production Cloud Deployment" },
  { code: "7.0", title: "Post-Implementation Review & Project Closure", pic: "PM & QDM", duration: "1 Minggu", deliverable: "Post-Implementation Review (PIR) & Asset Sign-off" }
];

export const PMO_BUDGET = [
  { item: "Honorarium Project Manager (12 Minggu @ Rp 3.500.000)", category: "Personel", amount: 42000000 },
  { item: "Honorarium Business Analyst (8 Minggu @ Rp 2.750.000)", category: "Personel", amount: 22000000 },
  { item: "Honorarium System Analyst & Lead Dev (10 Minggu @ Rp 3.250.000)", category: "Personel", amount: 32500000 },
  { item: "Honorarium Cost & Risk Manager (8 Minggu @ Rp 2.500.000)", category: "Personel", amount: 20000000 },
  { item: "Honorarium QA & Documentation Specialist (8 Minggu @ Rp 2.500.000)", category: "Personel", amount: 20000000 },
  { item: "Cloud VPS High-Availability & Managed DB Server (1 Tahun)", category: "Infrastruktur", amount: 9000000 },
  { item: "Domain Korporat .co.id & Wildcard SSL Certificate (1 Tahun)", category: "Infrastruktur", amount: 1100000 },
  { item: "Software Dev Tools, Figma & PM Jira Subscription (3 Bulan)", category: "Software", amount: 5950000 },
  { item: "Pencetakan Stiker Label QR Tahan Cuaca (600 unit @ Rp 5.000)", category: "Operasional", amount: 3000000 },
  { item: "Materi Pelatihan, Sertifikasi Staf & Workshop 4 Cabang", category: "Operasional", amount: 5000000 },
  { item: "Contingency Reserve Risiko (10% dari Total Estimasi Biaya)", category: "Cadangan Risiko", amount: 17950000 }
];

export const PMO_RISKS = [
  {
    id: "R-001",
    description: "Resistensi staf operasional cabang terhadap pengisian sistem baru (kebiasaan manual spreadsheet).",
    category: "Organizational" as const,
    likelihood: 4,
    impact: 4,
    score: 16,
    mitigation: "Melakukan user training intensif, sosialisasi SOP wajib dari Direksi, dan reward program bagi cabang terdisiplin.",
    owner: "BA & PM"
  },
  {
    id: "R-002",
    description: "Inakurasi dan inkonsistensi data audit fisik aset manual saat migrasi awal ke sistem.",
    category: "Operational" as const,
    likelihood: 4,
    impact: 4,
    score: 16,
    mitigation: "Pelaksanaan pre-migration data cleansing, physical spot-check 100% aset bernilai tinggi, dan verifikasi tanda tangan custodian.",
    owner: "BA & QDM"
  },
  {
    id: "R-003",
    description: "Keterlambatan pengerjaan modul akibat scope creep (permintaan fitur procurement baru di luar charter).",
    category: "Technical" as const,
    likelihood: 3,
    impact: 4,
    score: 12,
    mitigation: "Penerapan Integrated Change Control Board (CCB) ketat; fitur baru ditampung di backlog Fase 2.",
    owner: "PM"
  },
  {
    id: "R-004",
    description: "Kerusakan fisik atau kelupaan scan label QR Code pada aset bergerak/lapangan.",
    category: "Operational" as const,
    likelihood: 2,
    impact: 5,
    score: 10,
    mitigation: "Menggunakan bahan stiker vinyl sintetis tahan panas & air, plus cadangan pencarian manual via serial number.",
    owner: "QDM"
  },
  {
    id: "R-005",
    description: "Kegagalan infrastruktur cloud hosting / downtime server saat jam operasional mutasi.",
    category: "Technical" as const,
    likelihood: 2,
    impact: 4,
    score: 8,
    mitigation: "Menggunakan cloud provider dengan SLA 99.9%, backup otomatis harian ke multi-region, dan arsitektur PWA offline caching.",
    owner: "SA"
  },
  {
    id: "R-006",
    description: "Kekurangan alokasi anggaran tak terduga akibat fluktuasi biaya logistik pelatihan antar-pulau.",
    category: "Financial" as const,
    likelihood: 2,
    impact: 4,
    score: 8,
    mitigation: "Mengoptimalkan workshop cabang via hybrid webinar, serta memanfaatkan dana Management Contingency Reserve (10%).",
    owner: "CRRM"
  },
  {
    id: "R-007",
    description: "Keterlambatan respon persetujuan transfer dari kepala cabang yang sedang dinas luar.",
    category: "Operational" as const,
    likelihood: 2,
    impact: 4,
    score: 8,
    mitigation: "Sistem auto-delegasi approval ke wakil cabang setelah 48 jam dan notifikasi pengingat via email/WhatsApp.",
    owner: "BA"
  },
  {
    id: "R-008",
    description: "Perubahan regulasi depresiasi akuntansi perpajakan oleh otoritas fiskal.",
    category: "Organizational" as const,
    likelihood: 2,
    impact: 3,
    score: 6,
    mitigation: "Parameter tarif dan masa manfaat dibuat fleksibel dalam konfigurasi sistem tanpa perlu coding ulang.",
    owner: "CRRM"
  }
];

export const PMO_QUALITY_GATES = [
  { no: 1, criteria: "Tingkat kelulusan Functional Testing modul utama", threshold: "100% Pass Rate", status: "100% Lulus (Verified)" },
  { no: 2, criteria: "Tingkat kelulusan User Acceptance Testing (UAT)", threshold: "≥ 95% Skenario Disetujui", status: "100% Skenario Disetujui" },
  { no: 3, criteria: "Jumlah Critical / High Severity Defect terbuka", threshold: "0 Defect Terbuka", status: "0 Defect (Tuntas)" },
  { no: 4, criteria: "Verifikasi akurasi data migrasi spreadsheet ke DB", threshold: "100% Data Tervalidasi", status: "Tervalidasi 100% (524 Aset)" },
  { no: 5, criteria: "Tingkat kelulusan pelatihan staf di 4 lokasi cabang", threshold: "100% Staf Tersertifikasi", status: "Tersertifikasi 100%" },
  { no: 6, criteria: "Ketersediaan User Manual & Technical Architecture Docs", threshold: "Tersedia Lengkap & Baseline", status: "Lengkap & Approved" },
  { no: 7, criteria: "Pengujian Disaster Recovery & Backup otomatis harian", threshold: "Simulasi Pemulihan Sukses", status: "Teruji Sukses (< 15 Menit)" },
  { no: 8, criteria: "Tanda tangan persetujuan resmi (Sign-off) Sponsor", threshold: "Dokumen Formal Ditandatangani", status: "Signed by Direktur Utama" },
  { no: 9, criteria: "Uji performa kecepatan respon beban sistem", threshold: "Response Time < 3 Detik", status: "Rata-rata 420ms (Optimal)" },
  { no: 10, criteria: "Security Audit & Vulnerability Assessment", threshold: "0 Kerentanan Kritis", status: "Clean (0 Critical Findings)" }
];
