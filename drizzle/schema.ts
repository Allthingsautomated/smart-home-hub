import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Pricing Products Table
export const pricingProducts = mysqlTable("pricing_products", {
  id: int("id").autoincrement().primaryKey(),
  systemType: mysqlEnum("systemType", ["caseta", "ra3", "homeworks"]).notNull(),
  productType: mysqlEnum("productType", ["hub", "dimmer", "keypad", "remote"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PricingProduct = typeof pricingProducts.$inferSelect;
export type InsertPricingProduct = typeof pricingProducts.$inferInsert;

// Labor Rates Table
export const laborRates = mysqlTable("labor_rates", {
  id: int("id").autoincrement().primaryKey(),
  clientType: mysqlEnum("clientType", ["residential", "commercial"]).notNull().unique(),
  hourlyRate: decimal("hourlyRate", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LaborRate = typeof laborRates.$inferSelect;
export type InsertLaborRate = typeof laborRates.$inferInsert;