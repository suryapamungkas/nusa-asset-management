export type AssetCategory = 'IT Hardware' | 'Kendaraan' | 'Jaringan' | 'Percetakan' | 'Mebel';

export type BranchLocation = 'Jakarta' | 'Surabaya' | 'Medan' | 'Makassar';

export type AssetStatus = 'Digunakan' | 'Tersedia' | 'Maintenance' | 'In-Transit' | 'Disposed';

export type AssetCondition = 'Baik' | 'Cukup' | 'Butuh Servis' | 'Rusak Berat';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  brand: string;
  serial: string;
  branch: BranchLocation;
  custodian: string;
  cost: number;
  salvage: number;
  life: number; // in years
  date: string; // YYYY-MM-DD
  status: AssetStatus;
  condition: AssetCondition;
  notes?: string;
}

export interface DepreciationInfo {
  cost: number;
  salvage: number;
  lifeYears: number;
  monthsElapsed: number;
  monthlyDeprec: number;
  accumulatedDeprec: number;
  bookValue: number;
}

export interface TransferRequest {
  id: string;
  assetId: string;
  assetName: string;
  fromBranch: BranchLocation;
  toBranch: BranchLocation;
  newCustodian: string;
  date: string;
  status: 'Pending Manager Approval' | 'In-Transit' | 'Selesai (Received)' | 'Ditolak';
  reason: string;
}

export interface MaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  type: string;
  freq: string;
  nextDate: string;
  reminder: string;
  cost: number;
  status: 'Terjadwal' | 'Dalam Pengerjaan' | 'Selesai';
}

export interface DisposalRecord {
  id: string;
  assetId: string;
  assetName: string;
  branch: BranchLocation;
  reason: string;
  method: 'Scrap (Lelang Rongsok)' | 'Penjualan / Lelang Karyawan' | 'Hibah / Donasi' | 'Daur Ulang';
  value: number;
  approver: string;
  date: string;
}

export type UserRole = 'Administrator IT' | 'Manajer Operasional & Aset' | 'Kepala Cabang' | 'Staff Custodian';

export interface UatCase {
  id: string;
  module: string;
  scenario: string;
  expected: string;
  status: 'PASSED' | 'PENDING' | 'TESTING' | 'FAILED';
  testedAt?: string;
  notes?: string;
}

export interface RiskItem {
  id: string;
  description: string;
  category: 'Technical' | 'Operational' | 'Financial' | 'Organizational';
  likelihood: number; // 1-5
  impact: number; // 1-5
  score: number;
  mitigation: string;
  owner: string;
}

export interface WbsNode {
  code: string;
  title: string;
  pic: string;
  durationWeeks: string;
  deliverable: string;
}

export interface MilestoneItem {
  code: string;
  name: string;
  targetWeek: string;
  description: string;
  status: 'Completed' | 'In-Progress' | 'Scheduled';
}
