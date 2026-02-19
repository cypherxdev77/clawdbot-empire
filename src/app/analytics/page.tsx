"use client";

import { ProfitChart } from "@/components/charts/ProfitChart";
import { CategoryROIChart } from "@/components/charts/CategoryROIChart";
import { MarginDistribution } from "@/components/charts/MarginDistribution";
import { topBrandsData, mockSales } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytique</h1>
        <p className="text-sm text-gray-500 mt-1">Analyses détaillées de votre activité</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProfitChart />
        <CategoryROIChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarginDistribution />

        {/* Top brands table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Top marques – Performance</h3>
          <div className="space-y-3">
            {topBrandsData.map((b, i) => (
              <div key={b.brand} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-vinted/10 text-vinted text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{b.brand}</span>
                    <span className="text-sm text-gray-500">{b.sales} ventes</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-vinted rounded-full"
                      style={{ width: `${(b.sales / topBrandsData[0].sales) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">{b.avgMargin}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Métriques clés</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500">Ticket moyen</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(mockSales.reduce((s, v) => s + v.salePrice, 0) / mockSales.length)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Frais moyens / vente</p>
            <p className="text-lg font-bold text-red-500">{formatCurrency(mockSales.reduce((s, v) => s + v.platformFee + v.shippingCost, 0) / mockSales.length)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Meilleure marge</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(Math.max(...mockSales.map(s => s.margin)))}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">ROI moyen</p>
            <p className="text-lg font-bold text-vinted">{(mockSales.reduce((s, v) => s + v.marginPercent, 0) / mockSales.length).toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
