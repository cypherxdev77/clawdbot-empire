export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: { product: true },
      orderBy: { saleDate: "desc" },
    });

    const headers = ["Date vente", "Produit", "Marque", "Catégorie", "Taille", "Prix achat", "Prix vente", "Frais port", "Commission", "Marge", "Marge %", "Plateforme", "Acheteur"];
    const rows = sales.map((s) => [
      s.saleDate.toISOString().split("T")[0],
      `"${s.product.title.replace(/"/g, '""')}"`,
      s.product.brand || "",
      s.product.category || "",
      s.product.size || "",
      s.product.purchasePrice.toFixed(2),
      s.salePrice.toFixed(2),
      s.shippingCost.toFixed(2),
      s.platformFee.toFixed(2),
      s.margin.toFixed(2),
      s.marginPercent.toFixed(1) + "%",
      s.platform,
      s.buyerUsername || "",
    ]);

    const csv = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="ventes-vinted-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/export/csv error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
