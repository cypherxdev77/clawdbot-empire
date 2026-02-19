export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [total, inStock, listed, sold, returned, donated] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: "IN_STOCK" } }),
      prisma.product.count({ where: { status: "LISTED" } }),
      prisma.product.count({ where: { status: "SOLD" } }),
      prisma.product.count({ where: { status: "RETURNED" } }),
      prisma.product.count({ where: { status: "DONATED" } }),
    ]);

    const products = await prisma.product.findMany({
      where: { status: { in: ["IN_STOCK", "LISTED"] } },
    });

    const totalInvestment = products.reduce((sum, p) => sum + p.purchasePrice, 0);
    const totalListingValue = products.filter(p => p.listingPrice).reduce((sum, p) => sum + (p.listingPrice || 0), 0);

    return NextResponse.json({
      counts: { total, inStock, listed, sold, returned, donated },
      totalInvestment,
      totalListingValue,
      potentialProfit: totalListingValue - totalInvestment,
    });
  } catch (error) {
    console.error("GET /api/inventory error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
