import { Asset, TransferRequest, MaintenanceRecord, DisposalRecord, DepreciationInfo, UatCase } from './types';

export const DEFAULT_ASSETS: Asset[] = [
  {
    id: 'AST-JKT-2024-001',
    name: 'MacBook Pro 14 M3 Pro (18GB/512GB)',
    category: 'IT Hardware',
    brand: 'Apple',
    serial: 'C02XG123MD6R',
    branch: 'Jakarta',
    custodian: 'Budi Santoso (IT Lead)',
    cost: 31500000,
    salvage: 3000000,
    life: 4,
    date: '2024-01-15',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2024-002',
    name: 'Lenovo ThinkPad T14 Gen 4 Core i7',
    category: 'IT Hardware',
    brand: 'Lenovo',
    serial: 'PF2K8901',
    branch: 'Jakarta',
    custodian: 'Rina Wijaya (Finance)',
    cost: 22000000,
    salvage: 2000000,
    life: 4,
    date: '2024-02-10',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2023-003',
    name: 'Dell PowerEdge R750 Server Rack 2U',
    category: 'Jaringan',
    brand: 'Dell',
    serial: 'SN-R750-9981',
    branch: 'Jakarta',
    custodian: 'Agus Pratama (Sysadmin)',
    cost: 85000000,
    salvage: 10000000,
    life: 5,
    date: '2023-06-20',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2023-004',
    name: 'Toyota Avanza 1.5 G MT Operasional',
    category: 'Kendaraan',
    brand: 'Toyota',
    serial: 'B 1945 NIM',
    branch: 'Jakarta',
    custodian: 'Bambang (Driver)',
    cost: 260000000,
    salvage: 80000000,
    life: 8,
    date: '2023-03-12',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2024-005',
    name: 'Cisco Catalyst 2960-X 24-Port Switch',
    category: 'Jaringan',
    brand: 'Cisco',
    serial: 'FCW2145A09',
    branch: 'Jakarta',
    custodian: 'IT Network Pool',
    cost: 18500000,
    salvage: 2000000,
    life: 5,
    date: '2024-03-01',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2023-006',
    name: 'Printer HP LaserJet Enterprise M608',
    category: 'Percetakan',
    brand: 'HP',
    serial: 'CNB198204',
    branch: 'Jakarta',
    custodian: 'Admin Operasional',
    cost: 14500000,
    salvage: 1500000,
    life: 4,
    date: '2023-08-15',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-SBY-2024-007',
    name: 'Dell Latitude 5440 Core i5',
    category: 'IT Hardware',
    brand: 'Dell',
    serial: 'DL-5440-SBY1',
    branch: 'Surabaya',
    custodian: 'Hendra Saputra (Branch Mgr)',
    cost: 16800000,
    salvage: 1500000,
    life: 4,
    date: '2024-02-18',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-SBY-2023-008',
    name: 'Daihatsu GranMax Blind Van 1.3 AC',
    category: 'Kendaraan',
    brand: 'Daihatsu',
    serial: 'L 8812 NIM',
    branch: 'Surabaya',
    custodian: 'Siti Rahma (Logistik SBY)',
    cost: 175000000,
    salvage: 50000000,
    life: 8,
    date: '2023-05-10',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-SBY-2024-009',
    name: 'MikroTik Cloud Core Router CCR2004',
    category: 'Jaringan',
    brand: 'MikroTik',
    serial: 'MT-CCR-SBY9',
    branch: 'Surabaya',
    custodian: 'IT Support Surabaya',
    cost: 12500000,
    salvage: 1000000,
    life: 5,
    date: '2024-04-05',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-SBY-2023-010',
    name: 'Printer Barcode Zebra ZT230 Heavy Duty',
    category: 'Percetakan',
    brand: 'Zebra',
    serial: 'ZB-ZT230-01',
    branch: 'Surabaya',
    custodian: 'Warehouse Supervisor',
    cost: 16500000,
    salvage: 2000000,
    life: 5,
    date: '2023-09-12',
    status: 'Maintenance',
    condition: 'Butuh Servis'
  },
  {
    id: 'AST-MDN-2024-011',
    name: 'Lenovo ThinkPad E14 Gen 5 Ryzen 5',
    category: 'IT Hardware',
    brand: 'Lenovo',
    serial: 'PF-E14-MDN2',
    branch: 'Medan',
    custodian: 'Faisal Siregar (Branch Mgr)',
    cost: 13500000,
    salvage: 1500000,
    life: 4,
    date: '2024-03-22',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-MDN-2023-012',
    name: 'Toyota Avanza 1.3 E MT Operasional',
    category: 'Kendaraan',
    brand: 'Toyota',
    serial: 'BK 1405 NIM',
    branch: 'Medan',
    custodian: 'Doni Simanjuntak (Driver)',
    cost: 235000000,
    salvage: 70000000,
    life: 8,
    date: '2023-04-15',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-MDN-2024-013',
    name: 'Fortinet FortiGate 60F Firewall',
    category: 'Jaringan',
    brand: 'Fortinet',
    serial: 'FGT60F-MDN',
    branch: 'Medan',
    custodian: 'IT Staff Medan',
    cost: 15500000,
    salvage: 1500000,
    life: 5,
    date: '2024-01-20',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-MKS-2024-014',
    name: 'HP ProBook 440 G10 Core i5',
    category: 'IT Hardware',
    brand: 'HP',
    serial: 'HP-440-MKS1',
    branch: 'Makassar',
    custodian: 'Andi Mallarangeng (Branch Mgr)',
    cost: 15200000,
    salvage: 1500000,
    life: 4,
    date: '2024-04-10',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-MKS-2023-015',
    name: 'Honda Beat Street 110 Kurir Dokumen',
    category: 'Kendaraan',
    brand: 'Honda',
    serial: 'DD 3344 NIM',
    branch: 'Makassar',
    custodian: 'Hasanuddin (Kurir)',
    cost: 19500000,
    salvage: 5000000,
    life: 5,
    date: '2023-07-11',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2022-016',
    name: 'Server HP ProLiant DL380 Gen10 Legacy',
    category: 'Jaringan',
    brand: 'HP',
    serial: 'HP-DL380-OLD',
    branch: 'Jakarta',
    custodian: 'IT Storage Backup',
    cost: 95000000,
    salvage: 15000000,
    life: 5,
    date: '2022-01-10',
    status: 'Maintenance',
    condition: 'Butuh Servis'
  },
  {
    id: 'AST-SBY-2022-017',
    name: 'PC All-in-One Asus Vivo V241',
    category: 'IT Hardware',
    brand: 'Asus',
    serial: 'ASUS-VIVO-SBY',
    branch: 'Surabaya',
    custodian: 'CS Front Desk SBY',
    cost: 11000000,
    salvage: 1000000,
    life: 4,
    date: '2022-08-05',
    status: 'Tersedia',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2021-018',
    name: 'Printer Epson L3150 Wi-Fi Rusak',
    category: 'Percetakan',
    brand: 'Epson',
    serial: 'EPS-L3150-DEAD',
    branch: 'Jakarta',
    custodian: 'Gudang Rusak',
    cost: 2800000,
    salvage: 200000,
    life: 4,
    date: '2021-03-01',
    status: 'Disposed',
    condition: 'Rusak Berat'
  },
  {
    id: 'AST-JKT-2024-019',
    name: 'Meja Kerja Ergonomis Informa 140cm',
    category: 'Mebel',
    brand: 'Informa',
    serial: 'INF-MJ-140',
    branch: 'Jakarta',
    custodian: 'Ruang Finance',
    cost: 3500000,
    salvage: 300000,
    life: 6,
    date: '2024-01-10',
    status: 'Digunakan',
    condition: 'Baik'
  },
  {
    id: 'AST-JKT-2024-020',
    name: 'Kursi Kerja Ergohuman Mesh Office',
    category: 'Mebel',
    brand: 'Ergohuman',
    serial: 'ERGO-KS-01',
    branch: 'Jakarta',
    custodian: 'Ruang Direktur',
    cost: 6500000,
    salvage: 500000,
    life: 5,
    date: '2024-01-10',
    status: 'Digunakan',
    condition: 'Baik'
  }
];

export const DEFAULT_TRANSFERS: TransferRequest[] = [
  {
    id: 'TRF-2026-001',
    assetId: 'AST-JKT-2024-002',
    assetName: 'Lenovo ThinkPad T14',
    fromBranch: 'Jakarta',
    toBranch: 'Surabaya',
    newCustodian: 'Bambang Irawan',
    date: '2026-09-02',
    status: 'Pending Manager Approval',
    reason: 'Penambahan personil audit keuangan Surabaya'
  },
  {
    id: 'TRF-2026-002',
    assetId: 'AST-SBY-2024-009',
    assetName: 'MikroTik Cloud Core Router',
    fromBranch: 'Surabaya',
    toBranch: 'Makassar',
    newCustodian: 'IT Support Makassar',
    date: '2026-08-28',
    status: 'In-Transit',
    reason: 'Upgrade infrastruktur jaringan kantor cabang Makassar'
  },
  {
    id: 'TRF-2026-003',
    assetId: 'AST-JKT-2024-005',
    assetName: 'Cisco Catalyst Switch 24-Port',
    fromBranch: 'Jakarta',
    toBranch: 'Medan',
    newCustodian: 'IT Staff Medan',
    date: '2026-08-15',
    status: 'Selesai (Received)',
    reason: 'Perluasan port jaringan local cabang Medan'
  }
];

export const DEFAULT_MAINTENANCES: MaintenanceRecord[] = [
  {
    id: 'MNT-2026-01',
    assetId: 'AST-JKT-2023-004',
    assetName: 'Toyota Avanza 1.5 G (B 1945 NIM)',
    type: 'Servis Berkala 20.000 KM & Ganti Oli Mesin',
    freq: '6 Bulan',
    nextDate: '2026-09-15',
    reminder: 'H-6 (Aktif)',
    cost: 1850000,
    status: 'Terjadwal'
  },
  {
    id: 'MNT-2026-02',
    assetId: 'AST-SBY-2023-010',
    assetName: 'Printer Barcode Zebra ZT230',
    type: 'Penggantian Printhead Thermal & Kalibrasi Sensor',
    freq: 'Insidental',
    nextDate: '2026-09-10',
    reminder: 'Segera',
    cost: 2400000,
    status: 'Dalam Pengerjaan'
  },
  {
    id: 'MNT-2026-03',
    assetId: 'AST-JKT-2023-003',
    assetName: 'Dell PowerEdge R750 Server',
    type: 'Pembersihan Fisik Fan & Pembaruan Firmware BIOS',
    freq: '3 Bulan',
    nextDate: '2026-10-01',
    reminder: 'H-21',
    cost: 850000,
    status: 'Terjadwal'
  }
];

export const DEFAULT_DISPOSALS: DisposalRecord[] = [
  {
    id: 'DSP-2026-01',
    assetId: 'AST-JKT-2021-018',
    assetName: 'Printer Epson L3150 Wi-Fi',
    branch: 'Jakarta',
    reason: 'Head printer buntu total & board utama terbakar (biaya servis > 85% unit baru)',
    method: 'Scrap (Lelang Rongsok)',
    value: 150000,
    approver: 'Direktur Utama',
    date: '2026-08-10'
  }
];

export const DEFAULT_UAT_CASES: UatCase[] = [
  {
    id: 'TC-001',
    module: 'Registrasi & QR Code',
    scenario: 'Admin menambahkan aset baru via form dan memverifikasi kode QR unik yang dihasilkan secara deterministik.',
    expected: 'Aset baru masuk database lokal, kode terformat AST-[CABANG]-[THN]-[NO], QR Code render dengan benar.',
    status: 'PASSED'
  },
  {
    id: 'TC-002',
    module: 'Katalog & Pencarian Cepat',
    scenario: 'Pencarian real-time dengan kata kunci "MacBook" atau serial number pada tabel inventaris aset.',
    expected: 'Tabel menampilkan baris yang cocok dalam waktu < 100ms tanpa reload halaman.',
    status: 'PASSED'
  },
  {
    id: 'TC-003',
    module: 'Pemindai QR (< 5 Detik)',
    scenario: 'Simulasi scan kode QR AST-JKT-2024-001 untuk menampilkan informasi modal lengkap.',
    expected: 'Modal spesifikasi aset, penanggung jawab, dan nilai buku terbuka instan (< 5s).',
    status: 'PASSED'
  },
  {
    id: 'TC-004',
    module: 'Workflow Mutasi Cabang',
    scenario: 'Pengajuan mutasi aset dari Jakarta ke Surabaya, dilanjutkan approval Manajer menjadi "In-Transit".',
    expected: 'Status mutasi berubah ke In-Transit, lalu tombol "Konfirmasi Diterima" memindahkan cabang aset.',
    status: 'PASSED'
  },
  {
    id: 'TC-005',
    module: 'Kalkulator Depresiasi',
    scenario: 'Perhitungan penyusutan garis lurus untuk unit laptop berumur 2 tahun dari masa manfaat 4 tahun.',
    expected: 'Nilai buku terkini = Harga Perolehan - Akumulasi Penyusutan (konsisten dan matematis akurat).',
    status: 'PASSED'
  },
  {
    id: 'TC-006',
    module: 'Penjadwalan Servis',
    scenario: 'Menampilkan jadwal servis berkala kendaraan operasional dengan reminder aktif H-6.',
    expected: 'Status maintenance tampil rapi dengan estimasi biaya dan tombol penyelesaian servis.',
    status: 'PASSED'
  },
  {
    id: 'TC-007',
    module: 'Ekspor Data CSV',
    scenario: 'Klik tombol Export CSV/Excel untuk mengunduh rekapitulasi 524 aset PT Nusa Integra Mandiri.',
    expected: 'File CSV terunduh dengan format UTF-8 rapi berisi kolom lengkap termasuk nilai buku.',
    status: 'PASSED'
  },
  {
    id: 'TC-008',
    module: 'Role Switching & Hak Akses',
    scenario: 'Beralih peran antara Administrator IT, Manajer Operasional, dan Staff Custodian.',
    expected: 'UI menyesuaikan label otorisasi dan kontrol akses dinamis.',
    status: 'PASSED'
  }
];

export function calculateDepreciation(
  cost: number,
  salvage: number,
  lifeYears: number,
  purchaseDateStr: string
): DepreciationInfo {
  const pDate = new Date(purchaseDateStr);
  const now = new Date('2026-09-09');

  const monthsElapsed = Math.max(
    0,
    (now.getFullYear() - pDate.getFullYear()) * 12 + (now.getMonth() - pDate.getMonth())
  );
  const totalMonths = Math.max(1, lifeYears * 12);
  const depreciableAmount = Math.max(0, cost - salvage);
  const monthlyDeprec = depreciableAmount / totalMonths;

  const accumulatedDeprec = Math.min(depreciableAmount, monthlyDeprec * monthsElapsed);
  const bookValue = Math.max(salvage, cost - accumulatedDeprec);

  return {
    cost,
    salvage,
    lifeYears,
    monthsElapsed,
    monthlyDeprec: Math.round(monthlyDeprec),
    accumulatedDeprec: Math.round(accumulatedDeprec),
    bookValue: Math.round(bookValue)
  };
}

export function formatRupiah(num: number): string {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

export function generateSimpleQrSvg(text: string, size = 120): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }

  const grid = 21;
  const cellSize = size / grid;
  let rects = '';

  function addFinder(x: number, y: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 ||
          r === 6 ||
          c === 0 ||
          c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          rects += `<rect x="${(x + c) * cellSize}" y="${(y + r) * cellSize}" width="${cellSize}" height="${cellSize}" fill="currentColor" />`;
        }
      }
    }
  }

  addFinder(0, 0);
  addFinder(grid - 7, 0);
  addFinder(0, grid - 7);

  let seed = hash;
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= grid - 8) ||
        (r >= grid - 8 && c < 8)
      )
        continue;
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      if (seed % 100 > 48) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="currentColor" />`;
      }
    }
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" class="qr-svg">${rects}</svg>`;
}
