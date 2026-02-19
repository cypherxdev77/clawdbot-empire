import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.sale.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.product.deleteMany();
  await prisma.dealAlert.deleteMany();
  await prisma.scrapedListing.deleteMany();

  console.log("🧹 Base nettoyée");

  const products = [
    {
      title: "Nike Air Force 1 '07 Blanc",
      brand: "Nike",
      size: "42",
      category: "Chaussures",
      condition: "Très bon état",
      purchasePrice: 35,
      purchaseDate: new Date("2025-11-10"),
      purchaseSource: "Vinted",
      listingPrice: 65,
      listedAt: new Date("2025-11-12"),
      status: "SOLD" as const,
      sale: { salePrice: 62, saleDate: new Date("2025-11-20"), shippingCost: 4.5, platformFee: 3.1 },
    },
    {
      title: "Veste en jean Zara oversize",
      brand: "Zara",
      size: "M",
      category: "Vestes",
      condition: "Bon état",
      purchasePrice: 8,
      purchaseDate: new Date("2025-11-15"),
      purchaseSource: "Friperie",
      listingPrice: 25,
      listedAt: new Date("2025-11-16"),
      status: "SOLD" as const,
      sale: { salePrice: 22, saleDate: new Date("2025-12-01"), shippingCost: 3.5, platformFee: 1.1 },
    },
    {
      title: "Polo Ralph Lauren bleu marine",
      brand: "Ralph Lauren",
      size: "L",
      category: "Hauts",
      condition: "Très bon état",
      purchasePrice: 12,
      purchaseDate: new Date("2025-12-01"),
      purchaseSource: "Vinted",
      listingPrice: 30,
      listedAt: new Date("2025-12-02"),
      status: "SOLD" as const,
      sale: { salePrice: 28, saleDate: new Date("2025-12-15"), shippingCost: 3.5, platformFee: 1.4 },
    },
    {
      title: "Pantalon cargo Carhartt WIP",
      brand: "Carhartt",
      size: "30",
      category: "Pantalons",
      condition: "Neuf avec étiquette",
      purchasePrice: 25,
      purchaseDate: new Date("2025-12-10"),
      purchaseSource: "Leboncoin",
      listingPrice: 55,
      listedAt: new Date("2025-12-11"),
      status: "SOLD" as const,
      sale: { salePrice: 50, saleDate: new Date("2026-01-05"), shippingCost: 4.5, platformFee: 2.5 },
    },
    {
      title: "Sweat à capuche Nike vintage gris",
      brand: "Nike",
      size: "XL",
      category: "Hauts",
      condition: "Bon état",
      purchasePrice: 15,
      purchaseDate: new Date("2026-01-02"),
      purchaseSource: "Friperie",
      listingPrice: 35,
      listedAt: new Date("2026-01-03"),
      status: "SOLD" as const,
      sale: { salePrice: 32, saleDate: new Date("2026-01-18"), shippingCost: 4.5, platformFee: 1.6 },
    },
    {
      title: "Sac à main Longchamp Pliage noir",
      brand: "Longchamp",
      size: "M",
      category: "Accessoires",
      condition: "Très bon état",
      purchasePrice: 20,
      purchaseDate: new Date("2026-01-10"),
      purchaseSource: "Vinted",
      listingPrice: 45,
      listedAt: new Date("2026-01-11"),
      status: "SOLD" as const,
      sale: { salePrice: 42, saleDate: new Date("2026-01-25"), shippingCost: 4.5, platformFee: 2.1 },
    },
    {
      title: "Jean Levi's 501 vintage délavé",
      brand: "Levi's",
      size: "32",
      category: "Pantalons",
      condition: "Bon état",
      purchasePrice: 18,
      purchaseDate: new Date("2026-01-20"),
      purchaseSource: "Friperie",
      listingPrice: 40,
      listedAt: new Date("2026-01-21"),
      status: "LISTED" as const,
    },
    {
      title: "Doudoune The North Face Nuptse noire",
      brand: "The North Face",
      size: "M",
      category: "Vestes",
      condition: "Très bon état",
      purchasePrice: 85,
      purchaseDate: new Date("2026-01-25"),
      purchaseSource: "Vinted",
      listingPrice: 160,
      listedAt: new Date("2026-01-26"),
      status: "LISTED" as const,
    },
    {
      title: "T-shirt Lacoste blanc col V",
      brand: "Lacoste",
      size: "S",
      category: "Hauts",
      condition: "Neuf",
      purchasePrice: 6,
      purchaseDate: new Date("2026-02-01"),
      purchaseSource: "Lot Vinted",
      status: "IN_STOCK" as const,
    },
    {
      title: "Baskets Adidas Stan Smith vertes",
      brand: "Adidas",
      size: "40",
      category: "Chaussures",
      condition: "Bon état",
      purchasePrice: 22,
      purchaseDate: new Date("2026-02-05"),
      purchaseSource: "Leboncoin",
      listingPrice: 45,
      listedAt: new Date("2026-02-06"),
      status: "LISTED" as const,
    },
  ];

  for (const p of products) {
    const { sale: saleData, ...productData } = p as any;

    const product = await prisma.product.create({ data: productData });
    console.log(`✅ ${product.title}`);

    if (saleData) {
      const totalExpenses = 0;
      const margin = saleData.salePrice - productData.purchasePrice - saleData.shippingCost - saleData.platformFee - totalExpenses;
      const marginPercent = productData.purchasePrice > 0 ? (margin / productData.purchasePrice) * 100 : 0;

      await prisma.sale.create({
        data: {
          productId: product.id,
          ...saleData,
          platform: "Vinted",
          margin,
          marginPercent,
        },
      });
      console.log(`  💰 Vendu ${saleData.salePrice}€ (marge: ${margin.toFixed(2)}€)`);
    }
  }

  // Add some expenses
  const soldProducts = await prisma.product.findMany({ where: { status: "SOLD" }, take: 3 });
  if (soldProducts[0]) {
    await prisma.expense.create({ data: { productId: soldProducts[0].id, label: "Pressing", amount: 3, date: new Date("2025-11-11") } });
    console.log("📦 Expense: Pressing ajouté");
  }
  if (soldProducts[1]) {
    await prisma.expense.create({ data: { productId: soldProducts[1].id, label: "Emballage cadeau", amount: 1.5, date: new Date("2025-11-30") } });
    console.log("📦 Expense: Emballage ajouté");
  }

  console.log("\n🎉 Seed terminé !");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
