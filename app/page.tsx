"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Search,
  RefreshCw,
  UserCheck,
  Sun,
  Moon,
  Layers,
  FileText
} from "lucide-react";
import { MegaMenu, navCategories } from "@/components/MegaMenu";
import { Footer } from "@/components/Footer";
import { AssetDrawers } from "@/components/AssetDrawers";
import { AssetDetailModal } from "@/components/AssetDetailModal";
import { NimLogo } from "@/components/NimLogo";
import {
  Asset,
  TransferRequest,
  MaintenanceRecord,
  DisposalRecord,
  UserRole,
  UatCase,
  AssetCategory,
  BranchLocation
} from "@/lib/types";
import {
  DEFAULT_ASSETS,
  DEFAULT_TRANSFERS,
  DEFAULT_MAINTENANCES,
  DEFAULT_DISPOSALS,
  DEFAULT_UAT_CASES,
  calculateDepreciation
} from "@/lib/assetData";
import { DashboardTab } from "@/components/views/DashboardTab";
import { InventoryTab } from "@/components/views/InventoryTab";
import { RegisterTab } from "@/components/views/RegisterTab";
import { ScannerTab } from "@/components/views/ScannerTab";
import { TransferTab } from "@/components/views/TransferTab";
import { MaintenanceTab } from "@/components/views/MaintenanceTab";
import { DepreciationTab } from "@/components/views/DepreciationTab";
import { DisposalTab } from "@/components/views/DisposalTab";
import { UatRunnerTab } from "@/components/views/UatRunnerTab";
import { PmoTabs, PmoTabType } from "@/components/views/PmoTabs";

export default function Home() {
  // Theme state
  const [theme, setTheme] = useState<"light" | "night">("light");

  // Master Modes: 'app' (Aplikasi Aset) or 'pmo' (Dokumentasi PMO)
  const [masterMode, setMasterMode] = useState<"app" | "pmo">("app");

  // Tabs for 'app' mode
  const [activeAppTab, setActiveAppTab] = useState<
    "dashboard" | "inventory" | "register" | "scanner" | "transfer" | "maintenance" | "depreciation" | "disposal" | "uat-runner"
  >("dashboard");

  // Tabs for 'pmo' mode
  const [activePmoTab, setActivePmoTab] = useState<PmoTabType>("overview");

  // Drawers and Modal state
  const [drawerPanel, setDrawerPanel] = useState<"search" | "bag" | "profile" | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [selectedAssetDetail, setSelectedAssetDetail] = useState<Asset | null>(null);
  const [userRole, setUserRole] = useState<UserRole>("Administrator IT");

  // Core Data state
  const [assets, setAssets] = useState<Asset[]>(DEFAULT_ASSETS);
  const [transfers, setTransfers] = useState<TransferRequest[]>(DEFAULT_TRANSFERS);
  const [maintenances, setMaintenances] = useState<MaintenanceRecord[]>(DEFAULT_MAINTENANCES);
  const [disposals] = useState<DisposalRecord[]>(DEFAULT_DISPOSALS);
  const [uatCases, setUatCases] = useState<UatCase[]>(DEFAULT_UAT_CASES);

  // Filters for inventory
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterBranch, setFilterBranch] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Form State for Registering Asset
  const [regName, setRegName] = useState("");
  const [regCategory, setRegCategory] = useState<AssetCategory>("IT Hardware");
  const [regBrand, setRegBrand] = useState("");
  const [regSerial, setRegSerial] = useState("");
  const [regBranch, setRegBranch] = useState<BranchLocation>("Jakarta");
  const [regCustodian, setRegCustodian] = useState("");
  const [regCost, setRegCost] = useState<number>(15000000);
  const [regSalvage, setRegSalvage] = useState<number>(1500000);
  const [regLife, setRegLife] = useState<number>(4);
  const regDate = "2026-09-09";
  const [regNotice, setRegNotice] = useState("");

  // Scanner Simulator state
  const [scanQuery, setScanQuery] = useState("");
  const [scannedAsset, setScannedAsset] = useState<Asset | null>(null);

  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with LocalStorage on Mount
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("nim-theme") as "light" | "night" | null;
    if (savedTheme) setTheme(savedTheme);

    const savedAssets = window.localStorage.getItem("nim-assets");
    if (savedAssets) {
      try {
        setAssets(JSON.parse(savedAssets));
      } catch (e) {
        console.error("Failed to parse saved assets", e);
      }
    }

    const savedTransfers = window.localStorage.getItem("nim-transfers");
    if (savedTransfers) {
      try {
        setTransfers(JSON.parse(savedTransfers));
      } catch (e) {
        console.error("Failed to parse saved transfers", e);
      }
    }
  }, []);

  // Save Theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("nim-theme", theme);
  }, [theme]);

  // Persist Assets & Transfers
  useEffect(() => {
    window.localStorage.setItem("nim-assets", JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    window.localStorage.setItem("nim-transfers", JSON.stringify(transfers));
  }, [transfers]);

  // Keyboard Shortcuts (⌘K for Search, Escape to Close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setDrawerPanel("search");
      }
      if (e.key === "Escape") {
        setDrawerPanel(null);
        setActiveNav(null);
        setSelectedAssetDetail(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavMouseEnter = (id: string) => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    setActiveNav(id);
  };

  const handleNavMouseLeave = () => {
    navTimeoutRef.current = setTimeout(() => {
      setActiveNav(null);
    }, 180);
  };

  const handleNavigateMega = (href: string) => {
    if (href.startsWith("#tab-pmo-")) {
      const pmoTab = href.replace("#tab-pmo-", "") as PmoTabType;
      setMasterMode("pmo");
      setActivePmoTab(pmoTab);
    } else if (href.startsWith("#tab-")) {
      const appTab = href.replace("#tab-", "") as any;
      setMasterMode("app");
      setActiveAppTab(appTab);
    } else if (href === "#action-search") {
      setDrawerPanel("search");
    } else if (href === "#action-export") {
      exportCsv();
    }
  };

  // Add Asset Handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const branchCode =
      regBranch === "Jakarta"
        ? "JKT"
        : regBranch === "Surabaya"
        ? "SBY"
        : regBranch === "Medan"
        ? "MDN"
        : "MKS";
    const nextSeq = String(assets.length + 1).padStart(3, "0");
    const newId = `AST-${branchCode}-2026-${nextSeq}`;

    const newAsset: Asset = {
      id: newId,
      name: regName,
      category: regCategory,
      brand: regBrand,
      serial: regSerial,
      branch: regBranch,
      custodian: regCustodian || "Belum Ditugaskan",
      cost: Number(regCost),
      salvage: Number(regSalvage),
      life: Number(regLife),
      date: regDate,
      status: "Tersedia",
      condition: "Baik"
    };

    setAssets([newAsset, ...assets]);
    setRegNotice(`Aset ${newId} (${regName}) berhasil diregistrasi dengan QR Code unik!`);
    setTimeout(() => setRegNotice(""), 4500);

    // Reset Form
    setRegName("");
    setRegBrand("");
    setRegSerial("");
    setRegCustodian("");
  };

  // Transfer Mutation Handler
  const handleCreateTransfer = (req: Omit<TransferRequest, "id" | "date" | "status">) => {
    const nextSeq = String(transfers.length + 1).padStart(3, "0");
    const newTransfer: TransferRequest = {
      id: `TRF-2026-${nextSeq}`,
      date: "2026-09-09",
      status: "Pending Manager Approval",
      ...req
    };
    setTransfers([newTransfer, ...transfers]);
  };

  const handleApproveTransfer = (id: string) => {
    setTransfers(
      transfers.map((t) =>
        t.id === id ? { ...t, status: "In-Transit" } : t
      )
    );
  };

  const handleConfirmReceiveTransfer = (id: string) => {
    const targetTransfer = transfers.find((t) => t.id === id);
    if (!targetTransfer) return;

    setTransfers(
      transfers.map((t) =>
        t.id === id ? { ...t, status: "Selesai (Received)" } : t
      )
    );

    // Update actual asset branch and custodian
    setAssets(
      assets.map((a) => {
        if (a.id === targetTransfer.assetId) {
          return {
            ...a,
            branch: targetTransfer.toBranch,
            custodian: targetTransfer.newCustodian,
            status: "Digunakan"
          };
        }
        return a;
      })
    );
  };

  // Complete Maintenance
  const handleCompleteMaintenance = (id: string) => {
    setMaintenances(
      maintenances.map((m) =>
        m.id === id ? { ...m, status: "Selesai", reminder: "Servis Tuntas" } : m
      )
    );
  };

  // UAT Simulator
  const handleRunUatTest = (caseId: string) => {
    setUatCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: "TESTING" } : c))
    );
    setTimeout(() => {
      setUatCases((prev) =>
        prev.map((c) =>
          c.id === caseId
            ? { ...c, status: "PASSED", testedAt: new Date().toLocaleTimeString("id-ID") }
            : c
        )
      );
    }, 450);
  };

  const handleRunAllUat = () => {
    setUatCases((prev) => prev.map((c) => ({ ...c, status: "TESTING" })));
    setTimeout(() => {
      setUatCases((prev) =>
        prev.map((c) => ({
          ...c,
          status: "PASSED",
          testedAt: new Date().toLocaleTimeString("id-ID")
        }))
      );
    }, 800);
  };

  // CSV Export
  const exportCsv = () => {
    let csv =
      "Kode Aset,Nama Aset,Kategori,Merk,Serial Number,Cabang,Penanggung Jawab,Tgl Perolehan,Harga Beli (Rp),Nilai Buku (Rp),Status\n";
    assets.forEach((a) => {
      const depr = calculateDepreciation(a.cost, a.salvage, a.life, a.date);
      csv += `"${a.id}","${a.name}","${a.category}","${a.brand}","${a.serial}","${a.branch}","${a.custodian}","${a.date}",${a.cost},${depr.bookValue},"${a.status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Laporan_Aset_PT_Nusa_Integra_Mandiri.csv";
    link.click();
  };

  // Filtered Assets Calculation
  const filteredAssets = assets.filter((a) => {
    const matchesQuery =
      searchQuery === "" ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.serial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.custodian.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "ALL" || a.category === filterCategory;
    const matchesBranch = filterBranch === "ALL" || a.branch === filterBranch;
    const matchesStat = filterStatus === "ALL" || a.status === filterStatus;
    return matchesQuery && matchesCat && matchesBranch && matchesStat;
  });

  // Aggregated Metrics
  const totalBookValue = assets
    .filter((a) => a.status !== "Disposed")
    .reduce((acc, a) => acc + calculateDepreciation(a.cost, a.salvage, a.life, a.date).bookValue, 0);

  const pendingTransfersCount = transfers.filter((t) => t.status === "Pending Manager Approval").length;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--canvas)] text-[var(--ink)]">
      {/* =======================================================
          TOP APPLE-STYLE STICKY HEADER & GLASSMORPHISM
          ======================================================= */}
      <header
        className="site-header"
        onMouseEnter={() => {
          if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        }}
        onMouseLeave={handleNavMouseLeave}
      >
        <div className="nim-header-shell">
          {/* Brand Monogram */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="nim-brand-group group"
              onClick={() => {
                setMasterMode("app");
                setActiveAppTab("dashboard");
              }}
            >
              <NimLogo size={38} showText={true} />
            </a>
          </div>

          {/* Center: Mega Menu Triggers */}
          <nav className="desktop-nav hidden md:flex items-center justify-center gap-1">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeNav === cat.id
                    ? "bg-[var(--canvas-muted)] text-[var(--ink)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
                onMouseEnter={() => handleNavMouseEnter(cat.id)}
                onClick={() => handleNavMouseEnter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Mode Switcher & Tools */}
          <div className="flex items-center gap-2">
            {/* Master Mode Switcher Pill */}
            <div className="flex items-center p-0.5 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)]">
              <button
                onClick={() => setMasterMode("app")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1 ${
                  masterMode === "app"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                <Layers size={12} /> Aset
              </button>
              <button
                onClick={() => setMasterMode("pmo")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center gap-1 ${
                  masterMode === "pmo"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                <FileText size={12} /> PMO
              </button>
            </div>

            {/* Quick Search Drawer Button */}
            <button
              onClick={() => setDrawerPanel("search")}
              className="p-2 rounded-full hover:bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition relative"
              title="Cari Aset (⌘K)"
            >
              <Search size={17} />
            </button>

            {/* Mutasi Cart Drawer Button */}
            <button
              onClick={() => setDrawerPanel("bag")}
              className="p-2 rounded-full hover:bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition relative"
              title="Keranjang Mutasi & Transfer"
            >
              <RefreshCw size={17} />
              {pendingTransfersCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {pendingTransfersCount}
                </span>
              )}
            </button>

            {/* Role Switcher Button */}
            <button
              onClick={() => setDrawerPanel("profile")}
              className="p-2 rounded-full hover:bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
              title={`Peran: ${userRole}`}
            >
              <UserCheck size={17} />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "night" : "light")}
              className="p-2 rounded-full hover:bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
              title="Ganti Tema (Gelap / Terang)"
            >
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Global MegaMenu Dropdown */}
      <MegaMenu
        activeCategory={activeNav}
        onClose={() => setActiveNav(null)}
        onNavigate={handleNavigateMega}
        onMouseEnter={() => {
          if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        }}
        onMouseLeave={handleNavMouseLeave}
      />

      {/* =======================================================
          SUB-NAVIGATION BAR (Sticky Tabs Pill)
          ======================================================= */}
      <div className="nim-subnav-bar">
        <div className="nim-subnav-container">
          {masterMode === "app" ? (
            <div className="nim-pill-list">
              {(
                [
                  { id: "dashboard", label: "Dashboard Ringkasan" },
                  { id: "inventory", label: "Katalog Inventaris" },
                  { id: "register", label: "Registrasi & QR" },
                  { id: "scanner", label: "Pemindai QR (<5s)" },
                  { id: "transfer", label: "Mutasi Cabang", badge: pendingTransfersCount },
                  { id: "maintenance", label: "Pemeliharaan / Servis" },
                  { id: "depreciation", label: "Depresiasi Finansial" },
                  { id: "disposal", label: "Penghapusan / Scrap" },
                  { id: "uat-runner", label: "UAT Test Runner" },
                ] as Array<{
                  id: "dashboard" | "inventory" | "register" | "scanner" | "transfer" | "maintenance" | "depreciation" | "disposal" | "uat-runner";
                  label: string;
                  badge?: number;
                }>
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAppTab(tab.id)}
                  className={`nim-pill-btn ${activeAppTab === tab.id ? "active" : ""}`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 ? (
                    <span className="nim-pill-badge">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : (
            <div className="nim-pill-list">
              {(
                [
                  { id: "overview", label: "Profil & Gap Analysis" },
                  { id: "team", label: "Tim & RACI Matrix" },
                  { id: "charter", label: "Project Charter" },
                  { id: "wbs", label: "WBS Level 3" },
                  { id: "schedule", label: "Jadwal Gantt (W1-12)" },
                  { id: "budget", label: "Biaya & Anggaran" },
                  { id: "risk", label: "Risk Register & Heatmap" },
                  { id: "qa", label: "QA & 10 Quality Gates" },
                  { id: "comm", label: "Manajemen Komunikasi" },
                  { id: "procurement", label: "Pengadaan (Make/Buy)" },
                  { id: "integration", label: "Manajemen Integrasi" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePmoTab(tab.id)}
                  className={`nim-pill-btn ${activePmoTab === tab.id ? "active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Regional Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-[var(--ink-soft)] shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">PT Nusa Integra Mandiri</span>
            <span>&bull;</span>
            <span>1 Pusat (Jakarta) & 3 Cabang</span>
          </div>
        </div>
      </div>

      {/* =======================================================
          MAIN CONTENT VIEWPORT
          ======================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* =======================================================
            APP MODE VIEWS
            ======================================================= */}
        {masterMode === "app" && (
          <AnimatePresence mode="wait">
            {activeAppTab === "dashboard" && (
              <DashboardTab
                exportCsv={exportCsv}
                setActiveAppTab={setActiveAppTab}
                pendingTransfersCount={pendingTransfersCount}
              />
            )}

            {activeAppTab === "inventory" && (
              <InventoryTab
                filteredAssets={filteredAssets}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterBranch={filterBranch}
                setFilterBranch={setFilterBranch}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                exportCsv={exportCsv}
                setActiveAppTab={setActiveAppTab}
                setSelectedAssetDetail={setSelectedAssetDetail}
                setDrawerPanel={setDrawerPanel}
              />
            )}

            {activeAppTab === "register" && (
              <RegisterTab
                assets={assets}
                handleRegisterSubmit={handleRegisterSubmit}
                regNotice={regNotice}
                regName={regName}
                setRegName={setRegName}
                regCategory={regCategory}
                setRegCategory={setRegCategory}
                regBrand={regBrand}
                setRegBrand={setRegBrand}
                regSerial={regSerial}
                setRegSerial={setRegSerial}
                regBranch={regBranch}
                setRegBranch={setRegBranch}
                regCustodian={regCustodian}
                setRegCustodian={setRegCustodian}
                regCost={regCost}
                setRegCost={setRegCost}
                regSalvage={regSalvage}
                setRegSalvage={setRegSalvage}
                regLife={regLife}
                setRegLife={setRegLife}
              />
            )}

            {activeAppTab === "scanner" && (
              <ScannerTab
                assets={assets}
                scanQuery={scanQuery}
                setScanQuery={setScanQuery}
                scannedAsset={scannedAsset}
                setScannedAsset={setScannedAsset}
                setSelectedAssetDetail={setSelectedAssetDetail}
                setDrawerPanel={setDrawerPanel}
              />
            )}

            {activeAppTab === "transfer" && (
              <TransferTab
                transfers={transfers}
                handleApproveTransfer={handleApproveTransfer}
                handleConfirmReceiveTransfer={handleConfirmReceiveTransfer}
                setDrawerPanel={setDrawerPanel}
              />
            )}

            {activeAppTab === "maintenance" && (
              <MaintenanceTab
                maintenances={maintenances}
                handleCompleteMaintenance={handleCompleteMaintenance}
              />
            )}

            {activeAppTab === "depreciation" && (
              <DepreciationTab
                assets={assets}
                totalBookValue={totalBookValue}
              />
            )}

            {activeAppTab === "disposal" && (
              <DisposalTab disposals={disposals} />
            )}

            {activeAppTab === "uat-runner" && (
              <UatRunnerTab
                uatCases={uatCases}
                handleRunAllUat={handleRunAllUat}
                handleRunUatTest={handleRunUatTest}
              />
            )}
          </AnimatePresence>
        )}

        {/* =======================================================
            PMO MODE VIEWS (PMBOK / AGILE GOVERNANCE ARTIFACTS)
            ======================================================= */}
        {masterMode === "pmo" && (
          <PmoTabs activePmoTab={activePmoTab} />
        )}
      </main>

      {/* =======================================================
          SLIDE-OVER DRAWERS & MODALS
          ======================================================= */}
      <AssetDrawers
        panel={drawerPanel}
        onClose={() => setDrawerPanel(null)}
        assets={assets}
        transfers={transfers}
        currentRole={userRole}
        onRoleChange={(role) => setUserRole(role)}
        onSelectAsset={(asset) => setSelectedAssetDetail(asset)}
        onSubmitTransfer={handleCreateTransfer}
      />

      <AssetDetailModal
        asset={selectedAssetDetail}
        onClose={() => setSelectedAssetDetail(null)}
      />

      {/* =======================================================
          APPLE-STYLE CORPORATE FOOTER
          ======================================================= */}
      <Footer />
    </div>
  );
}
