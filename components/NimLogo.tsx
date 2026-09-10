"use client";

import React from "react";

interface NimLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: "image" | "svg";
}

export function NimLogo({
  size = 38,
  showText = false,
  className = "",
  variant = "image",
}: NimLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {variant === "image" ? (
        <div
          className="relative overflow-hidden rounded-xl shadow-sm border border-black/10 dark:border-white/15 flex-shrink-0 bg-slate-900 group-hover:scale-105 transition-transform"
          style={{ width: size, height: size }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nim_logo.jpg"
            alt="Logo PT Nusa Integra Mandiri"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        /* Vector SVG Isometric Cube Monogram */
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 group-hover:scale-105 transition-transform"
        >
          <defs>
            <linearGradient id="nim-metal-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="nim-metal-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="nim-metal-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Base Isometric Cube */}
          <polygon points="50,10 88,32 50,54 12,32" fill="url(#nim-metal-top)" opacity="0.95" />
          <polygon points="12,32 50,54 50,94 12,72" fill="url(#nim-metal-left)" />
          <polygon points="50,54 88,32 88,72 50,94" fill="url(#nim-metal-right)" />

          {/* Internal Luminous Circuit Lines */}
          <line x1="50" y1="54" x2="50" y2="94" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.4" />
          <line x1="50" y1="10" x2="50" y2="54" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="40" x2="26" y2="78" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="74" y1="40" x2="74" y2="78" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Center Digital Core / Node */}
          <circle cx="50" cy="54" r="5" fill="#ffffff" />
          <circle cx="50" cy="54" r="3" fill="#0284c7" />

          {/* Sub nodes */}
          <circle cx="26" cy="40" r="2.5" fill="#38bdf8" />
          <circle cx="74" cy="40" r="2.5" fill="#38bdf8" />
          <circle cx="26" cy="78" r="2.5" fill="#ffffff" />
          <circle cx="74" cy="78" r="2.5" fill="#ffffff" />
        </svg>
      )}

      {showText && (
        <div className="leading-tight">
          <span className="text-xs font-extrabold tracking-tight block text-[var(--ink)]">
            PT Nusa Integra Mandiri
          </span>
          <span className="text-[10px] text-[var(--ink-soft)] font-medium">
            Enterprise Asset Management
          </span>
        </div>
      )}
    </div>
  );
}
