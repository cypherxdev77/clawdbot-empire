"use client";

import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { mockProducts, statusLabels, statusColors, type Product, type ProductStatus } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Plus, Search, Filter, ChevronDown } from "lucide-react";

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

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-gray-900">{product.title}</p>
          <p className="text-xs text-gray-400">{product.brand} • {product.size} • {product.condition}</p>
        </div>
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0", statusColors[product.status])}>
          {statusLabels[product.status]}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3 text-sm">
        <div>
          <span className="text-gray-400 text-xs">Achat:</span>{" "}
          <span className="font-medium">{formatCurrency(product.purchasePrice)}</span>
        </div>
        {product.listingPrice && (
          <div>
            <span className="text-gray-400 text-xs">Vente:</span>{" "}
            <span className="font-medium text-vinted">{formatCurrency(product.listingPrice)}</span>
          </div>
        )}
        <span className="text-xs text-gray-400">{formatDate(product.purchaseDate)}</span>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
          className="flex items-center gap-2 bg-vinted hover:bg-vinted-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Ajouter un produit</span>
          <span className="sm:hidden">Ajouter</span>
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Nouveau produit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <input placeholder="Titre" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Marque" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Catégorie" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Taille" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="État" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input type="number" placeholder="Prix d'achat (€)" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input type="date" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input placeholder="Source d'achat" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
            <input type="number" placeholder="Prix de vente (€)" className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted" />
          </div>
          <div className="flex gap-3 mt-4">
            <button className="bg-vinted hover:bg-vinted-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]">
              Enregistrer
            </button>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 text-sm font-medium min-h-[44px]">
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30 focus:border-vinted"
        />
      </div>

      {/* Filters - collapsible on mobile */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 text-sm text-gray-500 font-medium mb-2 min-h-[44px]"
        >
          <Filter className="w-4 h-4" />
          Filtres
          <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
        </button>
        <div className={cn("flex flex-col sm:flex-row items-stretch sm:items-center gap-2", !showFilters && "hidden md:flex")}>
          <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30">
            <option value="">Toutes marques</option>
            {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30">
            <option value="">Toutes catégories</option>
            {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white min-h-[44px] focus:outline-none focus:ring-2 focus:ring-vinted/30">
            <option value="">Tous statuts</option>
            {allStatuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
          </select>
        </div>
      </div>

      {/* Mobile: card grid */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8 col-span-full">Aucun produit trouvé</p>
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block">
        <DataTable data={filtered as unknown as Record<string, unknown>[]} columns={columns as never} emptyMessage="Aucun produit trouvé" />
      </div>
    </div>
  );
}
