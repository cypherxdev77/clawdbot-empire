'use client';

import { formatCurrency, formatDate } from "@/lib/utils";

const expenses = [
  { 
    label: "Frais Vinted", 
    date: new Date("2026-02-01"), 
    amount: 124.50 
  },
  { 
    label: "Emballages", 
    date: new Date("2026-02-05"), 
    amount: 45.80 
  },
  { 
    label: "Frais de port", 
    date: new Date("2026-02-10"), 
    amount: 89.90 
  }
];

export default function ComptaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Comptabilité</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Export CSV
          </button>
          <button className="px-4 py-2 rounded-lg bg-vinted hover:bg-vinted-dark text-white transition-colors">
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dépenses du mois */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h2 className="font-medium mb-4">Dépenses du mois</h2>
          <div className="space-y-4">
            {expenses.map((e, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{e.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(e.date)}</p>
                </div>
                <span className="text-sm font-semibold text-red-500 dark:text-red-400">
                  -{formatCurrency(e.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Résumé compta */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h2 className="font-medium mb-4">Résumé comptable</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Chiffre d'affaires</span>
              <span className="font-medium">{formatCurrency(2450)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total dépenses</span>
              <span className="font-medium text-red-500 dark:text-red-400">
                -{formatCurrency(260.20)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium">Résultat net</span>
              <span className="font-semibold text-green-500 dark:text-green-400">
                {formatCurrency(2189.80)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}