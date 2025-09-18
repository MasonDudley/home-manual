import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Manual",
  description: "Your home's reference guide: rooms, systems, maintenance, docs, and more.",
};

const navItems: Array<{ href: string; label: string }> = [
  { href: "/", label: "Dashboard" },
  { href: "/rooms", label: "Rooms" },
  { href: "/appliances", label: "Appliances" },
  { href: "/maintenance", label: "Maintenance" },
  { href: "/inventory", label: "Inventory" },
  { href: "/docs", label: "Docs" },
  { href: "/vendors", label: "Vendors" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen grid grid-cols-[260px_1fr]">
          <aside className="hidden sm:flex flex-col border-r border-black/10 dark:border-white/10 p-4 gap-4">
            <div className="text-xl font-semibold">Home Manual</div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="px-3 py-2 rounded hover:bg-black/[.05] dark:hover:bg-white/[.06]">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto text-xs text-black/60 dark:text-white/60">v0.1.0</div>
          </aside>
          <main className="min-h-screen p-4 sm:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
