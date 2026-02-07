import { DashboardStats } from "@/components/DashboardStats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-vinted">📦 Vinted Resell</h1>
        <nav className="flex gap-4 text-sm font-medium">
          <a href="/" className="text-vinted">Dashboard</a>
          <a href="/inventory" className="hover:text-vinted">Inventaire</a>
          <a href="/sales" className="hover:text-vinted">Ventes</a>
          <a href="/alerts" className="hover:text-vinted">Alertes</a>
          <a href="/export" className="hover:text-vinted">Export</a>
        </nav>
      </header>
      <div className="p-6">
        <DashboardStats />
      </div>
    </main>
  );
}
