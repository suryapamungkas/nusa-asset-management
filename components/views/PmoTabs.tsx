"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  PMO_PROFILE,
  PMO_TEAM,
  PMO_CHARTER,
  PMO_WBS,
  PMO_BUDGET,
  PMO_RISKS,
  PMO_QUALITY_GATES
} from "@/lib/pmoData";
import { formatRupiah } from "@/lib/assetData";

export type PmoTabType =
  | "overview"
  | "team"
  | "charter"
  | "wbs"
  | "schedule"
  | "budget"
  | "risk"
  | "qa"
  | "comm"
  | "procurement"
  | "integration";

interface PmoTabsProps {
  activePmoTab: PmoTabType;
}

export function PmoTabs({ activePmoTab }: PmoTabsProps) {
  return (
    <AnimatePresence mode="wait">
      {/* PMO 1: OVERVIEW & GAP ANALYSIS */}
      {activePmoTab === "overview" && (
        <motion.div
          key="pmo-overview"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div className="nim-card space-y-4">
            <div className="pb-3 border-b border-[var(--line)]">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Bagian I: Konteks Proyek & Profil Bisnis
              </span>
              <h2 className="text-xl font-extrabold text-[var(--ink)] mt-0.5">
                {PMO_PROFILE.companyName}
              </h2>
              <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                {PMO_PROFILE.businessType} &bull; {PMO_PROFILE.scale}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle size={15} /> Problem Statement (AS-IS)
                </h4>
                <p className="text-xs text-[var(--ink)] leading-relaxed">
                  {PMO_PROFILE.problemStatement}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> Target Condition (TO-BE)
                </h4>
                <p className="text-xs text-[var(--ink)] leading-relaxed">
                  {PMO_PROFILE.targetCondition}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PMO 2: TIM & RACI MATRIX */}
      {activePmoTab === "team" && (
        <motion.div
          key="pmo-team"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div className="nim-card space-y-4">
            <div className="pb-3 border-b border-[var(--line)]">
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                Struktur Tim 5 Anggota & Pembagian Tanggung Jawab
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {PMO_TEAM.map((member) => (
                <div
                  key={member.role}
                  className="p-3.5 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-1.5 text-xs"
                >
                  <span className="font-bold text-sky-600 block">{member.role}</span>
                  <strong className="text-sm font-extrabold text-[var(--ink)] block">
                    {member.name}
                  </strong>
                  <p className="text-[11px] text-[var(--ink-soft)] font-medium">
                    {member.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RACI Matrix */}
          <div className="nim-card space-y-4">
            <div className="pb-3 border-b border-[var(--line)]">
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                RACI Matrix Deliverables Utama
              </h3>
            </div>

            <div className="nim-table-wrap">
              <table className="nim-table">
                <thead>
                  <tr>
                    <th>Deliverable Proyek</th>
                    <th className="text-center">PM</th>
                    <th className="text-center">BA</th>
                    <th className="text-center">SA</th>
                    <th className="text-center">CRRM</th>
                    <th className="text-center">QDM</th>
                    <th className="text-center">Sponsor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Project Charter & Scope Baseline</td>
                    <td className="text-center font-bold text-sky-600">A / R</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center font-bold text-emerald-600">A</td>
                  </tr>
                  <tr>
                    <td>Process Model (BPMN AS-IS/TO-BE)</td>
                    <td className="text-center text-neutral-400">A</td>
                    <td className="text-center font-bold text-sky-600">R</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">I</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">I</td>
                  </tr>
                  <tr>
                    <td>SRS & Architecture Prototype</td>
                    <td className="text-center text-neutral-400">A</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center font-bold text-sky-600">R</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">I</td>
                  </tr>
                  <tr>
                    <td>Budget Baseline & Contingency</td>
                    <td className="text-center text-neutral-400">A</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center font-bold text-sky-600">R</td>
                    <td className="text-center text-neutral-400">I</td>
                    <td className="text-center font-bold text-emerald-600">A</td>
                  </tr>
                  <tr>
                    <td>QA & UAT Sign-off Report</td>
                    <td className="text-center text-neutral-400">A</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">C</td>
                    <td className="text-center text-neutral-400">I</td>
                    <td className="text-center font-bold text-sky-600">R</td>
                    <td className="text-center font-bold text-emerald-600">A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* PMO 3: PROJECT CHARTER */}
      {activePmoTab === "charter" && (
        <motion.div
          key="pmo-charter"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-6"
        >
          <div className="pb-4 border-b border-[var(--line)]">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Dokumen Tata Kelola Proyek
            </span>
            <h2 className="text-xl font-extrabold text-[var(--ink)] mt-0.5">
              {PMO_CHARTER.title}
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Project Sponsor: <strong>{PMO_CHARTER.sponsor}</strong>
            </p>
          </div>

          {/* SMART Objectives */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
              Project SMART Objectives
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {PMO_CHARTER.smartObjectives.map((obj, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] flex items-start gap-2.5"
                >
                  <CheckCircle2 size={16} className="text-sky-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In Scope & Out Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-2 text-xs">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
                ✔ In-Scope (Batasan Dalam Cakupan)
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-[var(--ink)]">
                {PMO_CHARTER.inScope.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-2 text-xs">
              <h4 className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[11px]">
                ✖ Out-of-Scope (Di Luar Cakupan)
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-[var(--ink-soft)]">
                {PMO_CHARTER.outOfScope.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Milestones M1 - M6 */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
              Milestone Horizon 12 Minggu
            </h4>
            <div className="nim-table-wrap">
              <table className="nim-table">
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Milestone Deliverable</th>
                    <th>Target Waktu</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PMO_CHARTER.milestones.map((m) => (
                    <tr key={m.code}>
                      <td>
                        <span className="font-mono font-bold text-indigo-600">{m.code}</span>
                      </td>
                      <td>
                        <strong className="text-xs text-[var(--ink)]">{m.name}</strong>
                      </td>
                      <td>
                        <span className="text-xs font-mono">{m.target}</span>
                      </td>
                      <td>
                        <span className="badge-subtle badge-green">✓ {m.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* PMO 4: WBS LEVEL 3 */}
      {activePmoTab === "wbs" && (
        <motion.div
          key="pmo-wbs"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-5"
        >
          <div className="pb-4 border-b border-[var(--line)]">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Work Breakdown Structure (WBS Level 3 & Dictionary)
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Struktur hirarki pengerjaan proyek mencakup 7 fasa utama.
            </p>
          </div>

          <div className="nim-table-wrap">
            <table className="nim-table">
              <thead>
                <tr>
                  <th>WBS Code</th>
                  <th>Work Package / Task Title</th>
                  <th>PIC</th>
                  <th>Durasi</th>
                  <th>Deliverables Utama</th>
                </tr>
              </thead>
              <tbody>
                {PMO_WBS.map((task) => {
                  const isMainPhase = !task.code.includes(".");
                  return (
                    <tr
                      key={task.code}
                      className={isMainPhase ? "bg-[var(--canvas-soft)] font-bold" : ""}
                    >
                      <td>
                        <span className="font-mono text-xs font-bold text-sky-600">
                          {task.code}
                        </span>
                      </td>
                      <td>
                        <span className={isMainPhase ? "text-sm font-extrabold" : "text-xs pl-3"}>
                          {task.title}
                        </span>
                      </td>
                      <td>
                        <span className="badge-subtle">{task.pic}</span>
                      </td>
                      <td>
                        <span className="text-xs font-mono">{task.duration}</span>
                      </td>
                      <td>
                        <span className="text-xs text-[var(--ink-soft)] font-medium">
                          {task.deliverable}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PMO 5: JADWAL & GANTT */}
      {activePmoTab === "schedule" && (
        <motion.div
          key="pmo-schedule"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-5"
        >
          <div className="pb-4 border-b border-[var(--line)]">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Project Schedule & Gantt Matrix (Minggu 1 s.d. Minggu 12)
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Visualisasi durasi pengerjaan, alur predecessor, dan timeline implementasi.
            </p>
          </div>

          <div className="nim-table-wrap">
            <table className="nim-table text-[11px]">
              <thead>
                <tr>
                  <th>WBS</th>
                  <th>Nama Aktivitas</th>
                  <th>PIC</th>
                  <th>W1</th>
                  <th>W2</th>
                  <th>W3</th>
                  <th>W4</th>
                  <th>W5</th>
                  <th>W6</th>
                  <th>W7</th>
                  <th>W8</th>
                  <th>W9</th>
                  <th>W10</th>
                  <th>W11</th>
                  <th>W12</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "1.0", name: "Project Management & Charter", pic: "PM", w: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                  { code: "2.0", name: "Business Process Analysis (AS-IS/TO-BE)", pic: "BA", w: [1, 2, 3] },
                  { code: "3.0", name: "System Requirements & Wireframe", pic: "SA", w: [3, 4, 5, 6] },
                  { code: "4.0", name: "Core Module Development & QR Engine", pic: "SA", w: [5, 6, 7, 8, 9] },
                  { code: "5.0", name: "Quality Assurance & UAT Testing", pic: "QDM", w: [9, 10, 11] },
                  { code: "6.0", name: "Data Migration & Regional Training", pic: "ALL", w: [10, 11, 12] },
                  { code: "7.0", name: "Go-Live Cutover & Handover", pic: "PM", w: [12] },
                ].map((row) => (
                  <tr key={row.code}>
                    <td className="font-mono font-bold text-sky-600">{row.code}</td>
                    <td className="font-semibold">{row.name}</td>
                    <td><span className="badge-subtle">{row.pic}</span></td>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((wk) => (
                      <td key={wk} className="text-center p-1">
                        {row.w.includes(wk) ? (
                          <div className="h-4 bg-sky-500 dark:bg-sky-400 rounded-sm" />
                        ) : (
                          <span className="text-neutral-300 dark:text-neutral-700">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PMO 6: BIAYA & ANGGARAN */}
      {activePmoTab === "budget" && (
        <motion.div
          key="pmo-budget"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
            <div>
              <h2 className="text-lg font-extrabold text-[var(--ink)]">
                Cost Estimation & Rencana Anggaran Biaya (RAB)
              </h2>
              <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                Rincian biaya personel, infrastruktur cloud, lisensi tools, dan cadangan kontingensi risiko.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-right text-xs">
              <span className="text-[var(--ink-soft)] block text-[11px]">Total Anggaran Disetujui:</span>
              <strong className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                Rp 179.500.000
              </strong>
            </div>
          </div>

          <div className="nim-table-wrap">
            <table className="nim-table">
              <thead>
                <tr>
                  <th>Item Pengeluaran Proyek</th>
                  <th>Kategori</th>
                  <th className="text-right">Alokasi Biaya (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {PMO_BUDGET.map((b, idx) => (
                  <tr key={idx}>
                    <td className="text-xs font-semibold">{b.item}</td>
                    <td>
                      <span className="badge-subtle">{b.category}</span>
                    </td>
                    <td className="text-right font-mono font-bold text-xs">
                      {formatRupiah(b.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PMO 7: RISK REGISTER & HEATMAP 5x5 */}
      {activePmoTab === "risk" && (
        <motion.div
          key="pmo-risk"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div className="nim-card space-y-4">
            <div className="pb-3 border-b border-[var(--line)]">
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                Risk Register & Rencana Mitigasi (R-001 s.d. R-008)
              </h3>
            </div>

            <div className="nim-table-wrap">
              <table className="nim-table">
                <thead>
                  <tr>
                    <th>Risk ID</th>
                    <th>Deskripsi Risiko</th>
                    <th>Kategori</th>
                    <th className="text-center">Likelihood</th>
                    <th className="text-center">Impact</th>
                    <th className="text-center">Score</th>
                    <th>Strategi Mitigasi</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {PMO_RISKS.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <span className="font-mono font-bold text-rose-600">{r.id}</span>
                      </td>
                      <td className="text-xs font-medium max-w-xs">{r.description}</td>
                      <td><span className="badge-subtle">{r.category}</span></td>
                      <td className="text-center font-mono">{r.likelihood}</td>
                      <td className="text-center font-mono">{r.impact}</td>
                      <td className="text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            r.score >= 12
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          }`}
                        >
                          {r.score}
                        </span>
                      </td>
                      <td className="text-xs text-[var(--ink-soft)] max-w-sm">{r.mitigation}</td>
                      <td><span className="badge-subtle">{r.owner}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Heatmap 5x5 Matrix Preview */}
          <div className="nim-card space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
              Matriks Heatmap Risiko 5x5 (ISO 31000)
            </h4>
            <div className="p-4 rounded-xl bg-[var(--canvas-soft)] border border-[var(--line)] text-xs text-neutral-500 space-y-2">
              <p>
                &bull; <strong>Tingkat Kritis (Score 16):</strong> R-001 (Resistensi Staf) dan R-002 (Inakurasi Data Awal) berada pada kuadran merah tinggi dan diprioritaskan melalui validasi fisik 100%.
              </p>
              <p>
                &bull; <strong>Tingkat Menengah (Score 10-12):</strong> R-003 (Scope Creep) dikontrol oleh CCB, R-004 (Kerusakan Stiker QR) dicegah dengan bahan vinyl waterproof.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* PMO 8: QUALITY GATE & QA */}
      {activePmoTab === "qa" && (
        <motion.div
          key="pmo-qa"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-5"
        >
          <div className="pb-4 border-b border-[var(--line)]">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Quality Assurance & 10 Kriteria Kesiapan Go-Live (Quality Gate)
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Persyaratan mutlak yang harus terpenuhi 100% sebelum cutover sistem ke lingkungan produksi.
            </p>
          </div>

          <div className="nim-table-wrap">
            <table className="nim-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kriteria Kesiapan Go-Live</th>
                  <th>Threshold Minimum</th>
                  <th>Status Kepatuhan</th>
                </tr>
              </thead>
              <tbody>
                {PMO_QUALITY_GATES.map((q) => (
                  <tr key={q.no}>
                    <td className="font-mono text-xs">{q.no}</td>
                    <td className="text-xs font-bold text-[var(--ink)]">{q.criteria}</td>
                    <td className="text-xs font-medium">{q.threshold}</td>
                    <td>
                      <span className="badge-subtle badge-green">✓ {q.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PMO 9: MANAJEMEN KOMUNIKASI */}
      {activePmoTab === "comm" && (
        <motion.div
          key="pmo-comm"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-5"
        >
          <div className="pb-4 border-b border-[var(--line)]">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Communication Management Plan
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Matriks komunikasi stakeholder, jadwal rapat koordinasi, dan jalur eskalasi isu (L1-L4).
            </p>
          </div>

          <div className="nim-table-wrap">
            <table className="nim-table">
              <thead>
                <tr>
                  <th>Stakeholder</th>
                  <th>Informasi Dilaporkan</th>
                  <th>Frekuensi</th>
                  <th>Media</th>
                  <th>PIC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-xs">Project Sponsor (Direktur)</td>
                  <td className="text-xs">Executive Summary, status milestone, isu kritis</td>
                  <td className="text-xs">Bi-weekly</td>
                  <td className="text-xs">Email & Meeting Formal</td>
                  <td><span className="badge-subtle">PM</span></td>
                </tr>
                <tr>
                  <td className="font-bold text-xs">Kepala Departemen IT</td>
                  <td className="text-xs">Arsitektur teknis, progres sprint, kesiapan VPS</td>
                  <td className="text-xs">Mingguan</td>
                  <td className="text-xs">Teams & GitHub</td>
                  <td><span className="badge-subtle">SA</span></td>
                </tr>
                <tr>
                  <td className="font-bold text-xs">Manajer Operasional & Aset</td>
                  <td className="text-xs">Validasi proses bisnis, pengujian UAT, mutasi</td>
                  <td className="text-xs">Mingguan</td>
                  <td className="text-xs">Workshop & Demo</td>
                  <td><span className="badge-subtle">BA</span></td>
                </tr>
                <tr>
                  <td className="font-bold text-xs">Kepala Kantor Cabang (3)</td>
                  <td className="text-xs">Rencana training lokal, verifikasi data aset fisik</td>
                  <td className="text-xs">Bulanan</td>
                  <td className="text-xs">Video Conference & WhatsApp</td>
                  <td><span className="badge-subtle">PM</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PMO 10: MANAJEMEN PENGADAAN */}
      {activePmoTab === "procurement" && (
        <motion.div
          key="pmo-procurement"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-5"
        >
          <div className="pb-4 border-b border-[var(--line)]">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Procurement Management Plan (Make-or-Buy Analysis)
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Analisis keputusan pembuatan mandiri internal vs pengadaan pihak ketiga.
            </p>
          </div>

          <div className="nim-table-wrap">
            <table className="nim-table">
              <thead>
                <tr>
                  <th>Item Pengadaan</th>
                  <th>Keputusan</th>
                  <th>Justifikasi Pengambilan Keputusan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-xs font-bold">Cloud VPS & Database Server</td>
                  <td><span className="badge-subtle badge-blue">Buy (Cloud Provider)</span></td>
                  <td className="text-xs">Biaya awal efisien, SLA uptime 99.9%, backup otomatis terkelola.</td>
                </tr>
                <tr>
                  <td className="text-xs font-bold">Pengembangan Sistem Web Aset</td>
                  <td><span className="badge-subtle badge-green">Make (Internal Dev)</span></td>
                  <td className="text-xs">Kontrol penuh source code, penyesuaian khusus alur bisnis NIM.</td>
                </tr>
                <tr>
                  <td className="text-xs font-bold">Pencetakan Stiker Label QR Fisik</td>
                  <td><span className="badge-subtle badge-blue">Buy (Vendor Cetak)</span></td>
                  <td className="text-xs">Memerlukan mesin thermal vinyl khusus tahan air dan tahan panas.</td>
                </tr>
                <tr>
                  <td className="text-xs font-bold">Materi & Pelatihan Pengguna</td>
                  <td><span className="badge-subtle badge-green">Make (Internal Tim)</span></td>
                  <td className="text-xs">Tim proyek paling memahami detail modul dan skenario lapangan.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PMO 11: MANAJEMEN INTEGRASI */}
      {activePmoTab === "integration" && (
        <motion.div
          key="pmo-integration"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="nim-card space-y-5"
        >
          <div className="pb-4 border-b border-[var(--line)]">
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Integration Management & Metodologi Hybrid
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-0.5">
              Harmonisasi standar PMBOK (Inisiasi, Perencanaan, Penutupan) dengan Agile Scrum (Sprint 2 Mingguan).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--canvas-soft)] border border-[var(--line)] space-y-2 text-xs leading-relaxed">
            <h4 className="font-bold text-[var(--ink)]">Change Control Board (CCB):</h4>
            <p>
              Setiap usulan perubahan cakupan (scope change) di atas 5% anggaran baseline wajib mendapatkan persetujuan tertulis dari Project Sponsor dan Project Manager sebelum dieksekusi ke sprint backlog.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
