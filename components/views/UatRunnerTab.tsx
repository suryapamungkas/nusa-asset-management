"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
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
  return (
    <motion.div
      key="uat-runner"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="nim-card space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--ink)]">
            User Acceptance Testing (UAT) Interactive Runner
          </h2>
          <p className="text-xs text-[var(--ink-soft)] mt-0.5">
            Verifikasi 8 skenario pengujian fungsional modul sistem manajemen aset.
          </p>
        </div>
        <button
          onClick={handleRunAllUat}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <Play size={14} /> Jalankan Seluruh Skenario UAT
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {uatCases.map((tc) => (
          <div
            key={tc.id}
            className="p-4 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-2.5"
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
                    ? "badge-green"
                    : tc.status === "TESTING"
                    ? "badge-amber"
                    : "badge-blue"
                }`}
              >
                {tc.status}
              </span>
            </div>

            <p className="text-xs text-[var(--ink)] font-medium">
              {tc.scenario}
            </p>

            <p className="text-[11px] text-[var(--ink-soft)]">
              <strong>Ekspektasi:</strong> {tc.expected}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-[11px]">
              <span className="text-[var(--ink-soft)]">
                {tc.testedAt ? `Diverifikasi: ${tc.testedAt}` : "Status: Siap Diuji"}
              </span>
              <button
                onClick={() => handleRunUatTest(tc.id)}
                className="px-2.5 py-1 rounded-lg bg-[var(--canvas)] hover:bg-[var(--canvas-muted)] border border-[var(--line)] font-bold text-sky-600 transition"
              >
                Uji Kasus Ini &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
