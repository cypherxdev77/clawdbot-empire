"use client";

import { mockProducts, statusLabels, statusColors, type ProductStatus } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Package, Tag, CheckCircle, RotateCcw, Heart } from "lucide-react";

const statusIcons: Record<ProductStatus, typeof Package> = {
  IN_STOCK: Package,
  LISTED: Tag,
  SOLD: CheckCircle,
  RETURNED: RotateCcw,
  DONATED: Heart,
};

const grouped = mockProducts.reduce((acc, p) => {
  acc[p.status] = acc[p.status] || [];
  acc[p.status].push(p);
  return acc;
}, {} as Record<ProductStatus, typeof mockProducts>);

const totalValue = mockProducts
  .filter(p => p.status === 'IN_STOCK' || p.status === 'LISTED')
  .reduce((s, p) => s + p.purchasePrice, 0);

const potentialRevenue = mockProducts
  .filter(p => p.status === 'LISTED' && p.listingPrice)
  .reduce((s, p) => s + (p.listingPrice || 0), 0);

export default function InventoryPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventaire</h1>
        <p className="text-sm text-gray-500 mt-1">Gestion du stock et suivi des articles</p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Valeur en stock</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">CA potentiel (listés)</p>
          <p className="text-xl font-bold text-vinted mt-1">{formatCurrency(potentialRevenue)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Articles actifs</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{mockProducts.filter(p => p.status === 'IN_STOCK' || p.status === 'LISTED').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Taux de vente</p>
          <p className="text-xl font-bold text-green-600 mt-1">{((mockProducts.filter(p => p.status === 'SOLD').length / mockProducts.length) * 100).toFixed(0)}%</p>
        </div>
      </div>

      {/* Kanban-like columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {(Object.entries(grouped) as [ProductStatus, typeof mockProducts][]).map(([status, products]) => {
          const Icon = statusIcons[status];
          return (
            <div key={status} className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", statusColors[status])}>
                  {statusLabels[status]}
                </span>
                <span className="text-xs text-gray-400 ml-auto">{products.length}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {products.map(p => (
                  <div key={p.id} className="px-4 py-3 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{p.brand} • {p.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(p.purchasePrice)}</p>
                        {p.listingPrice && (
                          <p className="text-xs text-vinted">→ {formatCurrency(p.listingPrice)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
