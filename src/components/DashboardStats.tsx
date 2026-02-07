"use client";

const stats = [
  { label: "Articles en stock", value: "—", icon: "📦" },
  { label: "En vente", value: "—", icon: "🏷️" },
  { label: "Vendus ce mois", value: "—", icon: "✅" },
  { label: "Marge totale", value: "—", icon: "💰" },
  { label: "CA ce mois", value: "—", icon: "📈" },
  { label: "Marge moyenne", value: "—", icon: "📊" },
];

export function DashboardStats() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Vue d&apos;ensemble</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6 text-center text-gray-400">
        📊 Graphiques profits/inventaire — connecte Supabase pour voir les données
      </div>
    </div>
  );
}
