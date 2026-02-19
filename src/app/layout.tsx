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
        <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
