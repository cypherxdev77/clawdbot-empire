'use client';

import { CategoryROIChart } from "@/components/charts/CategoryROIChart";
import { MarginDistribution } from "@/components/charts/MarginDistribution";
import { topBrandsData, mockSales } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  const totalSales = mockSales.reduce((sum, s) => sum + s.salePrice, 0);
  const totalMargin = mockSales.reduce((sum, s) => sum + s.margin, 0);
  const avgMargin = totalMargin / mockSales.length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h2 className="text-lg font-medium mb-4">ROI par catégorie</h2>
          <div className="h-[300px]">
            <CategoryROIChart />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h2 className="text-lg font-medium mb-4">Distribution par marque</h2>
          <div className="h-[300px]">
            <MarginDistribution />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
        <h2 className="text-lg font-medium mb-4">Top marques</h2>
        <div className="space-y-3">
          {topBrandsData.map((b) => (
            <div key={b.brand}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{b.brand}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{b.value}% parts de marché</span>
              </div>
              <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-vinted rounded-full"
                  style={{ width: `${b.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CA Total</h3>
          <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalSales)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Marge Totale</h3>
          <p className="mt-2 text-2xl font-semibold text-green-600 dark:text-green-400">{formatCurrency(totalMargin)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Marge Moyenne</h3>
          <p className="mt-2 text-2xl font-semibold">{formatCurrency(avgMargin)}</p>
        </div>
      </div>
    </div>
  );
}