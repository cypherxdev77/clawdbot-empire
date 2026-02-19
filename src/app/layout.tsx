import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vinted Resell Tracker",
  description: "Suivi achats, ventes, marges & inventaire pour revendeurs Vinted",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Sidebar />
        <main className="ml-64 min-h-screen">
          <div className="p-6 lg:p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
