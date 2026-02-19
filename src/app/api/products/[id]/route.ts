export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateProductSchema } from "@/lib/validators";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { sale: true, expenses: true },
    });
    if (!product) return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = updateProductSchema.parse(body);

    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(product);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation échouée", details: error.errors }, { status: 400 });
    }
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
