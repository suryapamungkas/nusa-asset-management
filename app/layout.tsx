import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Manajemen Aset Perusahaan — PT Nusa Integra Mandiri",
  description: "Platform Manajemen Aset Terpadu Enterprise PT Nusa Integra Mandiri dengan Pelacakan QR Code, Mutasi Cabang, Kalkulasi Depresiasi, dan Tata Kelola PMO Lengkap.",
  authors: [
    { name: "Nur Hidayat Surya Pamungkas" },
  ],
  creator: "Nur Hidayat Surya Pamungkas",
  publisher: "PT Nusa Integra Mandiri",
  icons: {
    icon: "/nim_logo.jpg",
    apple: "/nim_logo.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
