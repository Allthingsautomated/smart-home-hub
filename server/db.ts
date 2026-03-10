import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, pricingProducts, laborRates, PricingProduct, LaborRate, InsertPricingProduct, InsertLaborRate } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Pricing queries
export async function getAllPricingProducts(): Promise<PricingProduct[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(pricingProducts);
}

export async function getPricingProductsBySystem(systemType: string): Promise<PricingProduct[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(pricingProducts).where(eq(pricingProducts.systemType, systemType as any));
}

export async function updatePricingProduct(id: number, data: Partial<InsertPricingProduct>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(pricingProducts).set(data).where(eq(pricingProducts.id, id));
}

export async function createPricingProduct(data: InsertPricingProduct): Promise<PricingProduct> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(pricingProducts).values(data);
  const products = await db.select().from(pricingProducts).where(eq(pricingProducts.id, result[0].insertId));
  return products[0];
}

// Labor rates queries
export async function getAllLaborRates(): Promise<LaborRate[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(laborRates);
}

export async function getLaborRateByType(clientType: string): Promise<LaborRate | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(laborRates).where(eq(laborRates.clientType, clientType as any)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLaborRate(id: number, data: Partial<InsertLaborRate>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(laborRates).set(data).where(eq(laborRates.id, id));
}

export async function createLaborRate(data: InsertLaborRate): Promise<LaborRate> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(laborRates).values(data);
  const rates = await db.select().from(laborRates).where(eq(laborRates.id, result[0].insertId));
  return rates[0];
}
