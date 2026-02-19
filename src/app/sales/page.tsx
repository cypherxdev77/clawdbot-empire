"use client";

import { DataTable } from "@/components/DataTable";
import { mockSales, type Sale } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { TrendingUp, DollarSign, Percent } from "lucide-react";

const totalCA = mockSales.reduce((s, v) => s + v.salePrice, 0);
const totalMargin = mockSales.reduce((s, v) => s + v.margin, 0);
const totalFees = mockSales.reduce((s, v) => s + v.platformFee + v.shippingCost, 0);
const avgMarginPct = mockSales.length > 0 ? mockSales.reduce((s, v) => s + v.marginPercent, 0) / mockSales.length : 0;

const columns = [
  { key: 'saleDate', header: 'Date', render: (s: Sale) => formatDate(s.saleDate) },
  { key: 'productTitle', header: 'Produit', render: (s: Sale) => (
    <div>
      <div className="font-medium text-gray-900">{s.productTitle}</div>
      <div className="text-xs text-gray-400">{s.brand} • {s.platform}</div>
    </div>
  )},
  { key: 'buyerUsername', header: 'Acheteur', render: (s: Sale) => (
    <span className="text-gray-500">@{s.buyerUsername}</span>
  )},
  { key: 'purchasePrice', header: 'Prix achat', render: (s: Sale) => formatCurrency(s.purchasePrice), className: 'text-right' },
  { key: 'salePrice', header: 'Prix vente', render: (s: Sale) => formatCurrency(s.salePrice), className: 'text-right' },
  { key: 'platformFee', header: 'Frais', render: (s: Sale) => (
    <span className="text-red-500 text-xs">{formatCurrency(s.platformFee + s.shippingCost)}</span>
  ), className: 'text-right' },
  { key: 'margin', header: 'Marge', render: (s: Sale) => (
    <div className="text-right">
      <div className="font-semibold text-green-600">{formatCurrency(s.margin)}</div>
      <div className="text-xs text-gray-400">{s.marginPercent.toFixed(1)}%</div>
    </div>
  ), className: 'text-right' },
];

export default function SalesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ventes</h1>
        <p className="text-sm text-gray-500 mt-1">Historique complet de vos ventes</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Nombre de ventes" value={String(mockSales.length)} icon={ShoppingCart} />
        <StatsCard label="CA total" value={formatCurrency(totalCA)} icon={DollarSign} />
        <StatsCard label="Marge nette totale" value={formatCurrency(totalMargin)} icon={TrendingUp} />
        <StatsCard label="Marge moyenne" value={`${avgMarginPct.toFixed(1)}%`} icon={Percent} />
      </div>

      <DataTable data={mockSales as unknown as Record<string, unknown>[]} columns={columns as never} />

      {/* Totals */}
      <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">Totaux</span>
        <div className="flex gap-8 text-sm">
          <div>CA: <span className="font-bold">{formatCurrency(totalCA)}</span></div>
          <div>Frais: <span className="font-bold text-red-500">{formatCurrency(totalFees)}</span></div>
          <div>Marge: <span className="font-bold text-green-600">{formatCurrency(totalMargin)}</span></div>
        </div>
      </div>
    </div>
  );
}
