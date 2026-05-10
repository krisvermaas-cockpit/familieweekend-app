import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Familieweekend 2026",
  description: "Programma Familieweekend Vorstenbosch 19-21 juni 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
