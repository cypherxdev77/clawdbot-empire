export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple PDF generation without external deps - returns HTML-based printable report
export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: { product: true },
      orderBy: { saleDate: "desc" },
    });

    const totalRevenue = sales.reduce((s, v) => s + v.salePrice, 0);
    const totalProfit = sales.reduce((s, v) => s + v.margin, 0);
    const totalInvested = sales.reduce((s, v) => s + v.product.purchasePrice, 0);

    const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Rapport Vinted Resell</title>
<style>
  body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
  h1 { color: #09b1ba; border-bottom: 2px solid #09b1ba; padding-bottom: 10px; }
  .stats { display: flex; gap: 20px; margin: 20px 0; }
  .stat { background: #f5f5f5; padding: 15px 25px; border-radius: 8px; }
  .stat .value { font-size: 24px; font-weight: bold; color: #09b1ba; }
  .stat .label { font-size: 12px; color: #666; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
  th { background: #09b1ba; color: white; padding: 8px; text-align: left; }
  td { padding: 8px; border-bottom: 1px solid #eee; }
  tr:nth-child(even) { background: #f9f9f9; }
  .positive { color: #22c55e; } .negative { color: #ef4444; }
  @media print { body { padding: 20px; } }
</style></head>
<body>
<h1>📊 Rapport de Ventes - Vinted Resell Tracker</h1>
<p>Généré le ${new Date().toLocaleDateString("fr-FR")} • ${sales.length} ventes</p>
<div class="stats">
  <div class="stat"><div class="value">${totalRevenue.toFixed(2)}€</div><div class="label">Chiffre d'affaires</div></div>
  <div class="stat"><div class="value ${totalProfit >= 0 ? "positive" : "negative"}">${totalProfit.toFixed(2)}€</div><div class="label">Profit net</div></div>
  <div class="stat"><div class="value">${totalInvested.toFixed(2)}€</div><div class="label">Investi</div></div>
  <div class="stat"><div class="value">${totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(1) : 0}%</div><div class="label">ROI</div></div>
</div>
<table>
<tr><th>Date</th><th>Produit</th><th>Marque</th><th>Achat</th><th>Vente</th><th>Marge</th><th>%</th></tr>
${sales.map((s) => `<tr>
  <td>${s.saleDate.toLocaleDateString("fr-FR")}</td>
  <td>${s.product.title}</td>
  <td>${s.product.brand || "-"}</td>
  <td>${s.product.purchasePrice.toFixed(2)}€</td>
  <td>${s.salePrice.toFixed(2)}€</td>
  <td class="${s.margin >= 0 ? "positive" : "negative"}">${s.margin.toFixed(2)}€</td>
  <td>${s.marginPercent.toFixed(1)}%</td>
</tr>`).join("")}
</table>
</body></html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="rapport-vinted-${new Date().toISOString().split("T")[0]}.html"`,
      },
    });
  } catch (error) {
    console.error("GET /api/export/pdf error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
