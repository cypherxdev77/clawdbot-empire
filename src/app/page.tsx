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
  { 
    key: 'salePrice', 
    header: 'Prix vente', 
    render: (s: Sale) => formatCurrency(s.salePrice),
    align: 'right' as const
  },
  { 
    key: 'margin', 
    header: 'Marge', 
    render: (s: Sale) => formatCurrency(s.margin),
    align: 'right' as const
  }
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard 
          title="Articles en stock" 
          value={inStock.toString()}
          icon={<Package className="w-4 h-4" />}
        />
        <StatsCard 
          title="En vente" 
          value={listed.toString()}
          icon={<Tag className="w-4 h-4" />}
        />
        <StatsCard 
          title="Vendus ce mois" 
          value={soldThisMonth.toString()}
          icon={<CheckCircle className="w-4 h-4" />}
          trend={{ value: 12, label: 'vs. mois dernier' }}
        />
        <StatsCard 
          title="Marge totale" 
          value={formatCurrency(totalMargin)}
          icon={<TrendingUp className="w-4 h-4" />}
          trend={{ value: 8, label: 'vs. mois dernier' }}
        />
        <StatsCard 
          title="CA ce mois" 
          value={formatCurrency(totalCA)}
          icon={<DollarSign className="w-4 h-4" />}
          trend={{ value: 15, label: 'vs. mois dernier' }}
        />
        <StatsCard 
          title="Marge moyenne" 
          value={formatCurrency(avgMargin)}
          icon={<Percent className="w-4 h-4" />}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h2 className="text-lg font-medium mb-4">Évolution marge</h2>
          <div className="h-[300px]">
            <ProfitChart />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h2 className="text-lg font-medium mb-4">Ventes récentes</h2>
          <DataTable 
            columns={recentSalesColumns}
            data={mockSales.slice(-5)}
            defaultSort={{ key: 'saleDate', direction: 'desc' }}
          />
        </div>
      </div>
    </div>
  );
}