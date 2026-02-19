"use client";

import { mockSales, mockProducts, mockExpenses } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, FileText, FileSpreadsheet } from "lucide-react";

const totalCA = mockSales.reduce((s, v) => s + v.salePrice, 0);
const totalAchats = mockProducts.reduce((s, p) => s + p.purchasePrice, 0);
const totalFraisPort = mockSales.reduce((s, v) => s + v.shippingCost, 0);
const totalCommissions = mockSales.reduce((s, v) => s + v.platformFee, 0);
const totalDepenses = mockExpenses.reduce((s, e) => s + e.amount, 0);
const totalCharges = totalAchats + totalFraisPort + totalCommissions + totalDepenses;
const beneficeNet = totalCA - totalCharges;

function handleExportCSV() {
  const headers = ['Date', 'Produit', 'Marque', 'Prix Achat', 'Prix Vente', 'Frais Port', 'Commission', 'Marge'];
  const rows = mockSales.map(s => [s.saleDate, s.productTitle, s.brand, s.purchasePrice, s.salePrice, s.shippingCost, s.platformFee, s.margin]);
  const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'vinted-compta.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function handleExportPDF() {
  alert('Export PDF : fonctionnalité disponible avec connexion jsPDF');
}

export default function ComptaPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comptabilité</h1>
          <p className="text-sm text-gray-500 mt-1">Bilan financier et exports</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-2 bg-vinted hover:bg-vinted-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* P&L Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Compte de résultat</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Chiffre d&apos;affaires (ventes)</span>
            <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalCA)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Coût des achats</span>
            <span className="text-sm font-semibold text-red-500">-{formatCurrency(totalAchats)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Frais de port (vendeur)</span>
            <span className="text-sm font-semibold text-red-500">-{formatCurrency(totalFraisPort)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Commissions plateforme</span>
            <span className="text-sm font-semibold text-red-500">-{formatCurrency(totalCommissions)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Dépenses additionnelles</span>
            <span className="text-sm font-semibold text-red-500">-{formatCurrency(totalDepenses)}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-gray-50 -mx-4 md:-mx-6 px-4 md:px-6 rounded-lg mt-2">
            <span className="text-sm font-bold text-gray-900">Bénéfice net</span>
            <span className={`text-lg font-bold ${beneficeNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(beneficeNet)}
            </span>
          </div>
        </div>
      </div>

      {/* Expenses Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Détail des dépenses annexes</h3>
          <div className="space-y-2">
            {mockExpenses.map(e => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{e.label}</p>
                  <p className="text-xs text-gray-400">{formatDate(e.date)}</p>
                </div>
                <span className="text-sm font-semibold text-red-500">-{formatCurrency(e.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="text-sm font-medium text-gray-500">Total</span>
              <span className="text-sm font-bold text-red-500">-{formatCurrency(totalDepenses)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Répartition des charges</h3>
          <div className="space-y-4">
            {[
              { label: 'Achats de stock', amount: totalAchats, color: 'bg-blue-500' },
              { label: 'Commissions Vinted', amount: totalCommissions, color: 'bg-amber-500' },
              { label: 'Frais de port', amount: totalFraisPort, color: 'bg-red-500' },
              { label: 'Dépenses annexes', amount: totalDepenses, color: 'bg-purple-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${(item.amount / totalCharges) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
