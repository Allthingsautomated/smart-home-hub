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

// Blog Posts Table
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: varchar("featuredImage", { length: 500 }),
  author: varchar("author", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  published: mysqlEnum("published", ["true", "false"]).default("false").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Social Media Credentials Table
export const socialMediaCredentials = mysqlTable("social_media_credentials", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  platform: mysqlEnum("platform", ["instagram", "x", "youtube"]).notNull(),
  accountHandle: varchar("accountHandle", { length: 255 }),
  credentialData: text("credentialData").notNull(), // encrypted JSON
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  connectedAt: timestamp("connectedAt").defaultNow().notNull(),
  lastTokenRefresh: timestamp("lastTokenRefresh"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SocialMediaCredential = typeof socialMediaCredentials.$inferSelect;
export type InsertSocialMediaCredential = typeof socialMediaCredentials.$inferInsert;

// Social Post History Table
export const socialPostHistory = mysqlTable("social_post_history", {
  id: int("id").autoincrement().primaryKey(),
  blogPostId: int("blogPostId").notNull(),
  platform: mysqlEnum("platform", ["instagram", "x", "youtube"]).notNull(),
  postId: varchar("postId", { length: 500 }),
  content: text("content"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  status: mysqlEnum("status", ["pending", "posted", "failed"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  scheduledAt: timestamp("scheduledAt"),
  postedAt: timestamp("postedAt"),
  views: int("views").default(0),
  engagement: int("engagement").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SocialPostHistory = typeof socialPostHistory.$inferSelect;
export type InsertSocialPostHistory = typeof socialPostHistory.$inferInsert;

// Platform Settings Table
export const platformSettings = mysqlTable("platform_settings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  platform: mysqlEnum("platform", ["instagram", "x", "youtube"]).notNull(),
  isEnabled: mysqlEnum("isEnabled", ["true", "false"]).default("true").notNull(),
  autoPost: mysqlEnum("autoPost", ["true", "false"]).default("false").notNull(),
  hashtagTemplate: text("hashtagTemplate"),
  contentTemplate: text("contentTemplate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlatformSettings = typeof platformSettings.$inferSelect;
export type InsertPlatformSettings = typeof platformSettings.$inferInsert;