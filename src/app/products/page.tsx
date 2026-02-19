"use client";

import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { mockProducts, statusLabels, statusColors, type Product, type ProductStatus } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Plus, Search, Filter } from "lucide-react";

const allBrands = Array.from(new Set(mockProducts.map(p => p.brand)));
const allCategories = Array.from(new Set(mockProducts.map(p => p.category)));
const allStatuses: ProductStatus[] = ['IN_STOCK', 'LISTED', 'SOLD', 'RETURNED', 'DONATED'];

const columns = [
  { key: 'title', header: 'Produit', render: (p: Product) => (
    <div>
      <div className="font-medium text-gray-900">{p.title}</div>
      <div className="text-xs text-gray-400">{p.size} • {p.condition}</div>
    </div>
  )},
  { key: 'brand', header: 'Marque' },
  { key: 'category', header: 'Catégorie' },
  { key: 'purchasePrice', header: 'Prix achat', render: (p: Product) => formatCurrency(p.purchasePrice), className: 'text-right' },
  { key: 'listingPrice', header: 'Prix vente', render: (p: Product) => p.listingPrice ? formatCurrency(p.listingPrice) : '—', className: 'text-right' },
  { key: 'purchaseDate', header: 'Date achat', render: (p: Product) => formatDate(p.purchaseDate) },
  { key: 'status', header: 'Statut', render: (p: Product) => (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusColors[p.status])}>
      {statusLabels[p.status]}
    </span>
  )},
];

export default function ProductsPage() {
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filtered = mockProducts.filter(p => {
    if (brandFilter && p.brand !== brandFilter) return false;
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-sm text-gray-500 mt-1">{mockProducts.length} articles au total</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-vinted hover:bg-vinted-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un produit
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Nouveau produit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Titre" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Marque" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Catégorie" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Taille" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="État" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input type="number" placeholder="Prix d'achat (€)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Source d'achat" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input type="number" placeholder="Prix de vente (€)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
          </div>
          <div className="flex gap-3 mt-4">
            <button className="bg-vinted hover:bg-vinted-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Enregistrer
            </button>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-vinted/30">
            <option value="">Toutes marques</option>
            {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-vinted/30">
            <option value="">Toutes catégories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-vinted/30">
            <option value="">Tous statuts</option>
            {allStatuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
          </select>
        </div>
      </div>

      <DataTable data={filtered as unknown as Record<string, unknown>[]} columns={columns as never} emptyMessage="Aucun produit trouvé" />
    </div>
  );
}
