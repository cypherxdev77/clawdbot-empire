"use client";

import { StatsCard } from "@/components/StatsCard";
import { ProfitChart } from "@/components/charts/ProfitChart";
import { DataTable } from "@/components/DataTable";
import { mockProducts, mockSales, type Sale } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Package, Tag, CheckCircle, TrendingUp, DollarSign, Percent } from "lucide-react";

const inStock = mockProducts.filter(p => p.status === 'IN_STOCK').length;
const listed = mockProducts.filter(p => p.status === 'LISTED').length;
const soldThisMonth = mockSales.filter(s => s.saleDate.startsWith('2026-02')).length;
const totalMargin = mockSales.reduce((sum, s) => sum + s.margin, 0);
const totalCA = mockSales.reduce((sum, s) => sum + s.salePrice, 0);
const avgMargin = mockSales.length > 0 ? totalMargin / mockSales.length : 0;

const recentSalesColumns = [
  { key: 'productTitle', header: 'Produit' },
  { key: 'brand', header: 'Marque' },
  { key: 'saleDate', header: 'Date', render: (s: Sale) => formatDate(s.saleDate) },
  { key: 'salePrice', header: 'Prix vente', render: (s: Sale) => formatCurrency(s.salePrice), className: 'text-right' as const },
  { key: 'purchasePrice', header: 'Prix achat', render: (s: Sale) => formatCurrency(s.purchasePrice), className: 'text-right' as const },
  { key: 'margin', header: 'Marge', render: (s: Sale) => (
    <span className="font-semibold text-green-600">{formatCurrency(s.margin)}</span>
  ), className: 'text-right' as const },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Vue d&apos;ensemble de votre activité de revente</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatsCard label="En stock" value={String(inStock)} icon={Package} />
        <StatsCard label="En vente" value={String(listed)} icon={Tag} />
        <StatsCard label="Vendus ce mois" value={String(soldThisMonth)} icon={CheckCircle} trend="+2 vs mois dernier" trendUp />
        <StatsCard label="Marge totale" value={formatCurrency(totalMargin)} icon={TrendingUp} trend="+12%" trendUp />
        <StatsCard label="CA total" value={formatCurrency(totalCA)} icon={DollarSign} />
        <StatsCard label="Marge moyenne" value={formatCurrency(avgMargin)} icon={Percent} />
      </div>

      {/* Chart */}
      <div className="mb-8">
        <ProfitChart />
      </div>

      {/* Recent Sales */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ventes récentes</h2>
        <DataTable data={mockSales as unknown as Record<string, unknown>[]} columns={recentSalesColumns as never} />
      </div>
    </div>
  );
}
