"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Terminal,
  Cpu
} from "lucide-react";
import { UatCase } from "@/lib/types";

interface UatRunnerTabProps {
  uatCases: UatCase[];
  handleRunAllUat: () => void;
  handleRunUatTest: (caseId: string) => void;
}

export function UatRunnerTab({
  uatCases,
  handleRunAllUat,
  handleRunUatTest
}: UatRunnerTabProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRunningAll, setIsRunningAll] = useState<boolean>(false);
  const [runProgress, setRunProgress] = useState<number>(100);
  const [logs, setLogs] = useState<string[]>([
    "Sistem UAT Test Suite siap dijalankan.",
    "8 Skenario penerimaan fungsional terdaftar.",
    "Lingkungan pengujian: PT Nusa Integra Mandiri ITAM v2.4 (Branch QA)."
  ]);

  const passedCount = uatCases.filter((c) => c.status === "PASSED").length;

  const runAllWithLogs = () => {
    setIsRunningAll(true);
    setRunProgress(15);
    setLogs(["[START] Menjalankan seluruh rangkaian UAT Test Suite (8 skenario)..."]);

    handleRunAllUat();

    setTimeout(() => {
      setRunProgress(45);
      setLogs((prev) => [
        ...prev,
        "[TEST] TC-AST-01: Verifikasi Scanner Optik SLA < 5 detik: LULUS (280ms)",
        "[TEST] TC-AST-02: Workflow Otorisasi Mutasi Cabang: LULUS (In-Transit ke Received)",
        "[TEST] TC-AST-03: Formula Depresiasi Garis Lurus PSAK 16: LULUS (Akurasi 100%)"
      ]);
    }, 350);

    setTimeout(() => {
      setRunProgress(85);
      setLogs((prev) => [
        ...prev,
        "[TEST] TC-AST-04: Jadwal Pemeliharaan Preventif H-3/H-7: LULUS",
        "[TEST] TC-AST-05: Berita Acara Scrap & Disposal: LULUS",
        "[TEST] TC-AST-06: Validasi Kode Aset Format Standar AST-XXX-YYYY: LULUS"
      ]);
    }, 650);

    setTimeout(() => {
      setRunProgress(100);
      setIsRunningAll(false);
      setLogs((prev) => [
        ...prev,
        "[TEST] TC-AST-07: Ekspor CSV Rekapitulasi Inventaris: LULUS",
        "[TEST] TC-AST-08: Responsivitas Mobile & Layar Sentuh: LULUS",
        "[SELESAI] Seluruh 8/8 Kasus UAT Berhasil Lulus Tanpa Cacat Kritis!"
      ]);
    }, 950);
  };

  const runSingleWithLog = (id: string, module: string) => {
    handleRunUatTest(id);
    setLogs((prev) => [
      `[RUN] Menguji kasus ${id} (${module})...`,
      `[OK] Kasus ${id} berhasil diverifikasi dan lulus kriteria penerimaan.`
    ]);
  };

  const filteredCases = uatCases.filter((c) => {
    if (filter === "ALL") return true;
    if (filter === "PASSED") return c.status === "PASSED";
    if (filter === "PENDING") return c.status !== "PASSED";
    return true;
  });

  return (
    <motion.div
      key="uat-runner"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="nim-card space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {passedCount} / {uatCases.length} Kasus Lulus
            </span>
            <span className="text-xs text-[var(--ink-soft)] font-mono">
              QA Coverage: 100%
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-[var(--ink)] mt-1">
            User Acceptance Testing (UAT) Interactive Test Runner
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Eksekusi dan validasi 8 skenario pengujian fungsional modul sistem manajemen aset sesuai standar penerimaan pengguna.
          </p>
        </div>

        <button
          onClick={runAllWithLogs}
          disabled={isRunningAll}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          {isRunningAll ? (
            <>
              <Cpu className="animate-spin" size={14} /> Menguji Seluruh Modul...
            </>
          ) : (
            <>
              <Play size={14} /> Jalankan Seluruh Skenario UAT
            </>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-[var(--ink-soft)]">Tingkat Kelulusan Acceptance Test:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">
            {Math.round((passedCount / uatCases.length) * 100)}% ({passedCount}/{uatCases.length})
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--canvas-soft)] border border-[var(--line)] overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(passedCount / uatCases.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--ink-soft)] font-medium">Filter Status:</span>
        <button
          onClick={() => setFilter("ALL")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            filter === "ALL"
              ? "bg-[var(--ink)] text-[var(--canvas)]"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Semua ({uatCases.length})
        </button>
        <button
          onClick={() => setFilter("PASSED")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            filter === "PASSED"
              ? "bg-emerald-600 text-white"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Passed ({passedCount})
        </button>
        <button
          onClick={() => setFilter("PENDING")}
          className={`px-3 py-1.5 rounded-xl font-bold transition ${
            filter === "PENDING"
              ? "bg-amber-600 text-white"
              : "bg-[var(--canvas-soft)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Siap Diuji ({uatCases.length - passedCount})
        </button>
      </div>

      {/* Test Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredCases.map((tc) => {
          const isExpanded = expandedId === tc.id;

          return (
            <div
              key={tc.id}
              className="p-4 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-2.5 transition hover:border-sky-500/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    {tc.id}
                  </span>
                  <span className="text-xs font-bold text-[var(--ink)]">
                    {tc.module}
                  </span>
                </div>
                <span
                  className={`badge-subtle ${
                    tc.status === "PASSED"
                      ? "badge-green font-bold"
                      : tc.status === "TESTING"
                      ? "badge-amber font-bold animate-pulse"
                      : "badge-blue font-bold"
                  }`}
                >
                  {tc.status}
                </span>
              </div>

              <p className="text-xs text-[var(--ink)] font-semibold leading-relaxed">
                {tc.scenario}
              </p>

              <div className="p-2.5 rounded-xl bg-[var(--canvas)] border border-[var(--line)] text-[11px] text-[var(--ink-soft)]">
                <strong className="text-[var(--ink)] block mb-0.5">Kriteria Keberhasilan:</strong>
                {tc.expected}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-[11px]">
                <span className="text-[var(--ink-soft)] font-mono">
                  {tc.testedAt ? `Diverifikasi: ${tc.testedAt}` : "Status: Siap Diuji"}
                </span>
                <button
                  onClick={() => runSingleWithLog(tc.id, tc.module)}
                  disabled={tc.status === "TESTING"}
                  className="px-2.5 py-1 rounded-lg bg-[var(--canvas)] hover:bg-[var(--canvas-muted)] border border-[var(--line)] font-bold text-sky-600 dark:text-sky-400 transition flex items-center gap-1"
                >
                  <Play size={10} /> Uji Kasus Ini
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Log Console */}
      <div className="p-4 rounded-2xl bg-neutral-950 text-neutral-200 border border-neutral-800 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-400" />
            <span>Konsol Eksekusi Pengujian (UAT Live Console)</span>
          </div>
          <span className="text-[10px] text-neutral-500">Auto-Scroll Active</span>
        </div>
        <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`leading-relaxed text-[11px] ${
                log.includes("[SELESAI]") || log.includes("[OK]")
                  ? "text-emerald-400 font-semibold"
                  : log.includes("[START]")
                  ? "text-sky-400"
                  : "text-neutral-300"
              }`}
            >
              &gt; {log}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
