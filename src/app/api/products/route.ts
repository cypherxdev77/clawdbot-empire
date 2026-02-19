export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createProductSchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const brand = url.searchParams.get("brand");
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    const where: any = {};
    if (status) where.status = status;
    if (brand) where.brand = { contains: brand, mode: "insensitive" };
    if (category) where.category = { contains: category, mode: "insensitive" };
    if (search) where.title = { contains: search, mode: "insensitive" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { sale: true, expenses: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, limit });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createProductSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        ...data,
        imageUrl: data.imageUrl || null,
        vintedUrl: data.vintedUrl || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation échouée", details: error.errors }, { status: 400 });
    }
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
