export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSaleSchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    const [sales, total] = await Promise.all([
      prisma.sale.findMany({
        include: { product: true },
        orderBy: { saleDate: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.sale.count(),
    ]);

    return NextResponse.json({ sales, total, page, limit });
  } catch (error) {
    console.error("GET /api/sales error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createSaleSchema.parse(body);

    // Get product to calculate margin
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
      include: { expenses: true },
    });
    if (!product) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });

    const totalExpenses = product.expenses.reduce((sum, e) => sum + e.amount, 0);
    const margin = data.salePrice - product.purchasePrice - data.shippingCost - data.platformFee - totalExpenses;
    const marginPercent = product.purchasePrice > 0 ? (margin / product.purchasePrice) * 100 : 0;

    const sale = await prisma.sale.create({
      data: {
        ...data,
        margin,
        marginPercent,
      },
    });

    // Update product status
    await prisma.product.update({
      where: { id: data.productId },
      data: { status: "SOLD" },
    });

    return NextResponse.json(sale, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation échouée", details: error.errors }, { status: 400 });
    }
    console.error("POST /api/sales error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
