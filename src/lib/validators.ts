import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  brand: z.string().optional(),
  size: z.string().optional(),
  category: z.string().optional(),
  condition: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  vintedUrl: z.string().url().optional().or(z.literal("")),
  purchasePrice: z.number().min(0),
  purchaseDate: z.string().transform((s) => new Date(s)),
  purchaseSource: z.string().optional(),
  listingPrice: z.number().min(0).optional(),
  listedAt: z.string().transform((s) => new Date(s)).optional(),
  status: z.enum(["IN_STOCK", "LISTED", "SOLD", "RETURNED", "DONATED"]).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const createSaleSchema = z.object({
  productId: z.string().min(1),
  salePrice: z.number().min(0),
  saleDate: z.string().transform((s) => new Date(s)),
  platform: z.string().default("Vinted"),
  buyerUsername: z.string().optional(),
  shippingCost: z.number().min(0).default(0),
  platformFee: z.number().min(0).default(0),
});
