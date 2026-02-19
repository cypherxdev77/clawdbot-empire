// Mock data for the entire app

export type ProductStatus = 'IN_STOCK' | 'LISTED' | 'SOLD' | 'RETURNED' | 'DONATED';

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  size: string;
  condition: string;
  purchasePrice: number;
  purchaseDate: string;
  purchaseSource: string;
  listingPrice: number | null;
  listedAt: string | null;
  status: ProductStatus;
  imageUrl: string | null;
}

export interface Sale {
  id: string;
  productId: string;
  productTitle: string;
  brand: string;
  category: string;
  salePrice: number;
  purchasePrice: number;
  saleDate: string;
  platform: string;
  buyerUsername: string;
  shippingCost: number;
  platformFee: number;
  margin: number;
  marginPercent: number;
}

export interface Expense {
  id: string;
  productId: string;
  label: string;
  amount: number;
  date: string;
}

export const mockProducts: Product[] = [
  { id: '1', title: 'Nike Air Max 90', brand: 'Nike', category: 'Chaussures', size: '42', condition: 'Très bon état', purchasePrice: 25, purchaseDate: '2026-01-05', purchaseSource: 'Vinted', listingPrice: 55, listedAt: '2026-01-07', status: 'LISTED', imageUrl: null },
  { id: '2', title: 'Levi\'s 501 Vintage', brand: 'Levi\'s', category: 'Pantalons', size: 'W32 L32', condition: 'Bon état', purchasePrice: 12, purchaseDate: '2026-01-03', purchaseSource: 'Friperie', listingPrice: 35, listedAt: '2026-01-04', status: 'SOLD', imageUrl: null },
  { id: '3', title: 'Ralph Lauren Polo', brand: 'Ralph Lauren', category: 'Hauts', size: 'M', condition: 'Neuf avec étiquette', purchasePrice: 18, purchaseDate: '2026-01-10', purchaseSource: 'Vinted', listingPrice: 40, listedAt: '2026-01-11', status: 'LISTED', imageUrl: null },
  { id: '4', title: 'The North Face Puffer', brand: 'The North Face', category: 'Vestes', size: 'L', condition: 'Très bon état', purchasePrice: 45, purchaseDate: '2026-01-08', purchaseSource: 'Leboncoin', listingPrice: 95, listedAt: '2026-01-09', status: 'SOLD', imageUrl: null },
  { id: '5', title: 'Adidas Samba OG', brand: 'Adidas', category: 'Chaussures', size: '43', condition: 'Bon état', purchasePrice: 30, purchaseDate: '2026-01-12', purchaseSource: 'Vinted', listingPrice: 65, listedAt: '2026-01-13', status: 'LISTED', imageUrl: null },
  { id: '6', title: 'Carhartt WIP Beanie', brand: 'Carhartt', category: 'Accessoires', size: 'Unique', condition: 'Neuf', purchasePrice: 8, purchaseDate: '2026-01-15', purchaseSource: 'Friperie', listingPrice: null, listedAt: null, status: 'IN_STOCK', imageUrl: null },
  { id: '7', title: 'Stussy Hoodie Noir', brand: 'Stussy', category: 'Hauts', size: 'L', condition: 'Très bon état', purchasePrice: 22, purchaseDate: '2026-01-14', purchaseSource: 'Vinted', listingPrice: 50, listedAt: '2026-01-15', status: 'SOLD', imageUrl: null },
  { id: '8', title: 'New Balance 550', brand: 'New Balance', category: 'Chaussures', size: '41', condition: 'Bon état', purchasePrice: 35, purchaseDate: '2026-01-18', purchaseSource: 'Vinted', listingPrice: 70, listedAt: '2026-01-19', status: 'LISTED', imageUrl: null },
  { id: '9', title: 'Tommy Hilfiger Chemise', brand: 'Tommy Hilfiger', category: 'Hauts', size: 'M', condition: 'Très bon état', purchasePrice: 10, purchaseDate: '2026-01-20', purchaseSource: 'Friperie', listingPrice: null, listedAt: null, status: 'IN_STOCK', imageUrl: null },
  { id: '10', title: 'Patagonia Fleece', brand: 'Patagonia', category: 'Vestes', size: 'M', condition: 'Bon état', purchasePrice: 28, purchaseDate: '2026-01-22', purchaseSource: 'Leboncoin', listingPrice: 60, listedAt: '2026-01-23', status: 'SOLD', imageUrl: null },
  { id: '11', title: 'Stone Island Sweat', brand: 'Stone Island', category: 'Hauts', size: 'L', condition: 'Très bon état', purchasePrice: 65, purchaseDate: '2026-01-25', purchaseSource: 'Vinted', listingPrice: 130, listedAt: '2026-01-26', status: 'LISTED', imageUrl: null },
  { id: '12', title: 'Burberry Écharpe', brand: 'Burberry', category: 'Accessoires', size: 'Unique', condition: 'Bon état', purchasePrice: 40, purchaseDate: '2026-01-28', purchaseSource: 'Friperie', listingPrice: 85, listedAt: '2026-01-29', status: 'SOLD', imageUrl: null },
];

export const mockSales: Sale[] = [
  { id: 's1', productId: '2', productTitle: 'Levi\'s 501 Vintage', brand: 'Levi\'s', category: 'Pantalons', salePrice: 32, purchasePrice: 12, saleDate: '2026-01-15', platform: 'Vinted', buyerUsername: 'marie_style', shippingCost: 2.9, platformFee: 1.6, margin: 15.5, marginPercent: 48.4 },
  { id: 's2', productId: '4', productTitle: 'The North Face Puffer', brand: 'The North Face', category: 'Vestes', salePrice: 89, purchasePrice: 45, saleDate: '2026-01-20', platform: 'Vinted', buyerUsername: 'lucas_vintage', shippingCost: 4.5, platformFee: 4.45, margin: 35.05, marginPercent: 39.4 },
  { id: 's3', productId: '7', productTitle: 'Stussy Hoodie Noir', brand: 'Stussy', category: 'Hauts', salePrice: 48, purchasePrice: 22, saleDate: '2026-01-28', platform: 'Vinted', buyerUsername: 'theo_drip', shippingCost: 3.2, platformFee: 2.4, margin: 20.4, marginPercent: 42.5 },
  { id: 's4', productId: '10', productTitle: 'Patagonia Fleece', brand: 'Patagonia', category: 'Vestes', salePrice: 55, purchasePrice: 28, saleDate: '2026-02-01', platform: 'Vinted', buyerUsername: 'emma_green', shippingCost: 3.8, platformFee: 2.75, margin: 20.45, marginPercent: 37.2 },
  { id: 's5', productId: '12', productTitle: 'Burberry Écharpe', brand: 'Burberry', category: 'Accessoires', salePrice: 78, purchasePrice: 40, saleDate: '2026-02-04', platform: 'Vinted', buyerUsername: 'chloe_luxe', shippingCost: 2.5, platformFee: 3.9, margin: 31.6, marginPercent: 40.5 },
];

export const mockExpenses: Expense[] = [
  { id: 'e1', productId: '4', label: 'Pressing', amount: 5, date: '2026-01-09' },
  { id: 'e2', productId: '12', label: 'Nettoyage', amount: 3, date: '2026-01-29' },
  { id: 'e3', productId: '11', label: 'Réparation zip', amount: 8, date: '2026-01-27' },
];

export const monthlyProfitData = [
  { month: 'Sep', profit: 45, ca: 120 },
  { month: 'Oct', profit: 78, ca: 210 },
  { month: 'Nov', profit: 120, ca: 340 },
  { month: 'Déc', profit: 95, ca: 280 },
  { month: 'Jan', profit: 156, ca: 420 },
  { month: 'Fév', profit: 83, ca: 230 },
];

export const categoryROIData = [
  { category: 'Chaussures', roi: 85, count: 3 },
  { category: 'Hauts', roi: 110, count: 4 },
  { category: 'Vestes', roi: 78, count: 2 },
  { category: 'Pantalons', roi: 167, count: 1 },
  { category: 'Accessoires', roi: 95, count: 2 },
];

export const topBrandsData = [
  { brand: 'Nike', sales: 8, avgMargin: 42 },
  { brand: 'The North Face', sales: 6, avgMargin: 38 },
  { brand: 'Levi\'s', sales: 5, avgMargin: 52 },
  { brand: 'Stussy', sales: 4, avgMargin: 45 },
  { brand: 'Patagonia', sales: 3, avgMargin: 35 },
];

// Status labels in French
export const statusLabels: Record<ProductStatus, string> = {
  IN_STOCK: 'En stock',
  LISTED: 'En vente',
  SOLD: 'Vendu',
  RETURNED: 'Retourné',
  DONATED: 'Donné',
};

export const statusColors: Record<ProductStatus, string> = {
  IN_STOCK: 'bg-blue-100 text-blue-700',
  LISTED: 'bg-amber-100 text-amber-700',
  SOLD: 'bg-green-100 text-green-700',
  RETURNED: 'bg-red-100 text-red-700',
  DONATED: 'bg-purple-100 text-purple-700',
};
