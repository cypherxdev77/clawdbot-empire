export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Dashboard stats
    const sales = await prisma.sale.findMany({ include: { product: true } });
    const allProducts = await prisma.product.findMany({ include: { expenses: true } });

    const totalRevenue = sales.reduce((sum, s) => sum + s.salePrice, 0);
    const totalProfit = sales.reduce((sum, s) => sum + s.margin, 0);
    const totalInvested = allProducts.reduce((sum, p) => sum + p.purchasePrice, 0);
    const avgMarginPercent = sales.length > 0 ? sales.reduce((sum, s) => sum + s.marginPercent, 0) / sales.length : 0;

    // Profit over time (by month)
    const profitByMonth: Record<string, { revenue: number; profit: number; count: number }> = {};
    for (const sale of sales) {
      const key = `${sale.saleDate.getFullYear()}-${String(sale.saleDate.getMonth() + 1).padStart(2, "0")}`;
      if (!profitByMonth[key]) profitByMonth[key] = { revenue: 0, profit: 0, count: 0 };
      profitByMonth[key].revenue += sale.salePrice;
      profitByMonth[key].profit += sale.margin;
      profitByMonth[key].count++;
    }

    const profitOverTime = Object.entries(profitByMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({ month, ...data }));

    // ROI by category
    const categoryStats: Record<string, { invested: number; revenue: number; profit: number; count: number }> = {};
    for (const sale of sales) {
      const cat = sale.product.category || "Sans catégorie";
      if (!categoryStats[cat]) categoryStats[cat] = { invested: 0, revenue: 0, profit: 0, count: 0 };
      categoryStats[cat].invested += sale.product.purchasePrice;
      categoryStats[cat].revenue += sale.salePrice;
      categoryStats[cat].profit += sale.margin;
      categoryStats[cat].count++;
    }

    const roiByCategory = Object.entries(categoryStats).map(([category, data]) => ({
      category,
      ...data,
      roi: data.invested > 0 ? ((data.profit / data.invested) * 100).toFixed(1) : "0",
    }));

    // Top brands
    const brandStats: Record<string, { profit: number; count: number }> = {};
    for (const sale of sales) {
      const brand = sale.product.brand || "Sans marque";
      if (!brandStats[brand]) brandStats[brand] = { profit: 0, count: 0 };
      brandStats[brand].profit += sale.margin;
      brandStats[brand].count++;
    }
    const topBrands = Object.entries(brandStats)
      .map(([brand, data]) => ({ brand, ...data }))
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 10);

    return NextResponse.json({
      dashboard: {
        totalRevenue,
        totalProfit,
        totalInvested,
        avgMarginPercent: Math.round(avgMarginPercent * 100) / 100,
        totalSales: sales.length,
        totalProducts: allProducts.length,
      },
      profitOverTime,
      roiByCategory,
      topBrands,
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
