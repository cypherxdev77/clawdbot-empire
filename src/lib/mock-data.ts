export type Product = {
  id: string;
  title: string;
  brand: string;
  description?: string;
  size?: string;
  category: string;
  condition: string;
  imageUrl?: string;
  vintedUrl?: string;
  purchasePrice: number;
  purchaseDate: string;
  listingPrice?: number;
  listedAt?: string;
  status: 'IN_STOCK' | 'LISTED' | 'SOLD';
};

export type Sale = {
  id: string;
  productId: string;
  productTitle: string;
  brand: string;
  salePrice: number;
  saleDate: string;
  margin: number;
  platform: string;
};

export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Nike Air Force 1 '07 Blanc",
    brand: "Nike",
    category: "Chaussures",
    condition: "Très bon état",
    purchasePrice: 42.60,
    purchaseDate: "2026-01-15",
    listingPrice: 69.90,
    listedAt: "2026-01-16",
    status: "SOLD"
  },
  {
    id: "p2",
    title: "Veste en jean Zara oversize",
    brand: "Zara",
    category: "Vestes",
    condition: "Bon état",
    purchasePrice: 12.60,
    purchaseDate: "2026-01-20",
    listingPrice: 24.90,
    listedAt: "2026-01-21",
    status: "SOLD"
  },
  {
    id: "p3",
    title: "Polo Ralph Lauren bleu marine",
    brand: "Ralph Lauren",
    category: "Hauts",
    condition: "Comme neuf",
    purchasePrice: 16.90,
    purchaseDate: "2026-01-25",
    listingPrice: 29.90,
    listedAt: "2026-01-26",
    status: "SOLD"
  },
  {
    id: "p4",
    title: "Pantalon cargo Carhartt WIP",
    brand: "Carhartt",
    category: "Pantalons",
    condition: "Neuf avec étiquette",
    purchasePrice: 32.00,
    purchaseDate: "2026-02-01",
    listingPrice: 54.90,
    listedAt: "2026-02-02",
    status: "SOLD"
  },
  {
    id: "p5",
    title: "Sweat à capuche Nike vintage gris",
    brand: "Nike",
    category: "Sweats",
    condition: "Bon état",
    purchasePrice: 21.10,
    purchaseDate: "2026-02-05",
    listingPrice: 34.90,
    listedAt: "2026-02-06",
    status: "SOLD"
  },
  {
    id: "p6",
    title: "Sac à main Longchamp Pliage noir",
    brand: "Longchamp",
    category: "Sacs",
    condition: "Très bon état",
    purchasePrice: 26.60,
    purchaseDate: "2026-02-10",
    listingPrice: 44.90,
    listedAt: "2026-02-11",
    status: "SOLD"
  },
  {
    id: "p7",
    title: "Jean Levi's 501 vintage délavé",
    brand: "Levi's",
    category: "Jeans",
    condition: "Bon état",
    purchasePrice: 24.90,
    purchaseDate: "2026-02-15",
    listingPrice: 49.90,
    listedAt: "2026-02-16",
    status: "LISTED"
  },
  {
    id: "p8",
    title: "Doudoune The North Face Nuptse noire",
    brand: "The North Face",
    category: "Manteaux",
    condition: "Comme neuf",
    purchasePrice: 89.90,
    purchaseDate: "2026-02-15",
    listingPrice: 159.90,
    listedAt: "2026-02-16",
    status: "LISTED"
  },
  {
    id: "p9",
    title: "T-shirt Lacoste blanc col V",
    brand: "Lacoste",
    category: "T-shirts",
    condition: "Neuf avec étiquette",
    purchasePrice: 19.90,
    purchaseDate: "2026-02-18",
    status: "IN_STOCK"
  },
  {
    id: "p10",
    title: "Baskets Adidas Stan Smith vertes",
    brand: "Adidas",
    category: "Chaussures",
    condition: "Bon état",
    purchasePrice: 29.90,
    purchaseDate: "2026-02-19",
    status: "IN_STOCK"
  },
];

export const mockSales: Sale[] = [
  {
    id: "s1",
    productId: "p1",
    productTitle: "Nike Air Force 1 '07 Blanc",
    brand: "Nike",
    salePrice: 62.00,
    saleDate: "2026-02-01",
    margin: 19.40,
    platform: "Vinted"
  },
  {
    id: "s2",
    productId: "p2",
    productTitle: "Veste en jean Zara oversize",
    brand: "Zara",
    salePrice: 22.00,
    saleDate: "2026-02-05",
    margin: 9.40,
    platform: "Vinted"
  },
  {
    id: "s3",
    productId: "p3",
    productTitle: "Polo Ralph Lauren bleu marine",
    brand: "Ralph Lauren",
    salePrice: 28.00,
    saleDate: "2026-02-08",
    margin: 11.10,
    platform: "Vinted"
  },
  {
    id: "s4",
    productId: "p4",
    productTitle: "Pantalon cargo Carhartt WIP",
    brand: "Carhartt",
    salePrice: 50.00,
    saleDate: "2026-02-12",
    margin: 18.00,
    platform: "Vinted"
  },
  {
    id: "s5",
    productId: "p5",
    productTitle: "Sweat à capuche Nike vintage gris",
    brand: "Nike",
    salePrice: 32.00,
    saleDate: "2026-02-15",
    margin: 10.90,
    platform: "Vinted"
  },
  {
    id: "s6",
    productId: "p6",
    productTitle: "Sac à main Longchamp Pliage noir",
    brand: "Longchamp",
    salePrice: 42.00,
    saleDate: "2026-02-18",
    margin: 15.40,
    platform: "Vinted"
  }
];