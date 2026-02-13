import { z } from "zod";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  getAllPricingProducts,
  getPricingProductsBySystem,
  updatePricingProduct,
  createPricingProduct,
  getAllLaborRates,
  getLaborRateByType,
  updateLaborRate,
  createLaborRate,
} from "./db";

export const pricingRouter = router({
  // Public: Get all pricing products
  getProducts: publicProcedure.query(async () => {
    return await getAllPricingProducts();
  }),

  // Public: Get products by system type
  getProductsBySystem: publicProcedure
    .input(z.object({ systemType: z.enum(["caseta", "ra3", "homeworks"]) }))
    .query(async ({ input }) => {
      return await getPricingProductsBySystem(input.systemType);
    }),

  // Public: Get all labor rates
  getLaborRates: publicProcedure.query(async () => {
    return await getAllLaborRates();
  }),

  // Public: Get labor rate by type
  getLaborRateByType: publicProcedure
    .input(z.object({ clientType: z.enum(["residential", "commercial"]) }))
    .query(async ({ input }) => {
      return await getLaborRateByType(input.clientType);
    }),

  // Admin: Update pricing product
  updateProduct: adminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        price: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const updateData: Record<string, any> = {};
      if (data.name) updateData.name = data.name;
      if (data.price) updateData.price = parseFloat(data.price);
      if (data.description) updateData.description = data.description;
      
      await updatePricingProduct(id, updateData);
      return { success: true };
    }),

  // Admin: Create pricing product
  createProduct: adminProcedure
    .input(
      z.object({
        systemType: z.enum(["caseta", "ra3", "homeworks"]),
        productType: z.enum(["hub", "dimmer", "keypad", "remote"]),
        name: z.string(),
        price: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await createPricingProduct({
        systemType: input.systemType,
        productType: input.productType,
        name: input.name,
        price: parseFloat(input.price) as any,
        description: input.description,
      });
    }),

  // Admin: Update labor rate
  updateLaborRate: adminProcedure
    .input(
      z.object({
        id: z.number(),
        hourlyRate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const updateData: Record<string, any> = {};
      if (data.hourlyRate) updateData.hourlyRate = parseFloat(data.hourlyRate);
      if (data.description) updateData.description = data.description;
      
      await updateLaborRate(id, updateData);
      return { success: true };
    }),

  // Admin: Create labor rate
  createLaborRate: adminProcedure
    .input(
      z.object({
        clientType: z.enum(["residential", "commercial"]),
        hourlyRate: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await createLaborRate({
        clientType: input.clientType,
        hourlyRate: parseFloat(input.hourlyRate) as any,
        description: input.description,
      });
    }),
});
