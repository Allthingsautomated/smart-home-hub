import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  blogPosts,
  socialMediaCredentials,
  socialPostHistory,
  platformSettings,
  BlogPost,
  InsertBlogPost,
  SocialMediaCredential,
  InsertSocialMediaCredential,
  SocialPostHistory,
  InsertSocialPostHistory,
  PlatformSettings,
  InsertPlatformSettings,
} from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Blog Posts Operations
 */

export async function createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(blogPosts).values(data).execute();
  const id = Array.isArray(result) && result.length > 0 ? (result[0] as any).insertId : undefined;

  if (!id) {
    throw new Error("Failed to create blog post");
  }

  const post = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1)
    .execute();

  if (!post || post.length === 0) {
    throw new Error("Failed to retrieve created blog post");
  }

  return post[0];
}

export async function getBlogPostById(id: number): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .execute();

  return posts[0];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .execute();

  return posts[0];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).execute();
}

export async function updateBlogPost(
  id: number,
  data: Partial<InsertBlogPost>
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).execute();
}

export async function publishBlogPost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(blogPosts)
    .set({
      published: "true" as any,
      publishedAt: new Date(),
    })
    .where(eq(blogPosts.id, id))
    .execute();
}

export async function deleteBlogPost(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(blogPosts).where(eq(blogPosts.id, id)).execute();
}

/**
 * Social Media Credentials Operations
 */

export async function saveSocialCredentials(
  userId: number,
  platform: string,
  encrypted: string,
  accountHandle?: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const existing = await db
    .select()
    .from(socialMediaCredentials)
    .where(
      and(
        eq(socialMediaCredentials.userId, userId),
        eq(socialMediaCredentials.platform, platform as any)
      )
    )
    .execute();

  if (existing.length > 0) {
    await db
      .update(socialMediaCredentials)
      .set({
        credentialData: encrypted,
        accountHandle,
        isActive: "true" as any,
        lastTokenRefresh: new Date(),
      })
      .where(eq(socialMediaCredentials.id, existing[0].id))
      .execute();
  } else {
    await db.insert(socialMediaCredentials).values({
      userId,
      platform: platform as any,
      credentialData: encrypted,
      accountHandle,
      isActive: "true" as any,
    });
  }
}

export async function getSocialCredentials(
  userId: number,
  platform: string
): Promise<SocialMediaCredential | undefined> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const credentials = await db
    .select()
    .from(socialMediaCredentials)
    .where(
      and(
        eq(socialMediaCredentials.userId, userId),
        eq(socialMediaCredentials.platform, platform as any),
        eq(socialMediaCredentials.isActive, "true" as any)
      )
    )
    .execute();

  return credentials[0];
}

export async function getAllSocialCredentials(
  userId: number
): Promise<SocialMediaCredential[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db
    .select()
    .from(socialMediaCredentials)
    .where(
      and(
        eq(socialMediaCredentials.userId, userId),
        eq(socialMediaCredentials.isActive, "true" as any)
      )
    )
    .execute();
}

export async function deleteSocialCredentials(
  userId: number,
  platform: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .delete(socialMediaCredentials)
    .where(
      and(
        eq(socialMediaCredentials.userId, userId),
        eq(socialMediaCredentials.platform, platform as any)
      )
    )
    .execute();
}

/**
 * Social Post History Operations
 */

export async function recordSocialPost(
  data: InsertSocialPostHistory
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(socialPostHistory).values(data).execute();
}

export async function getSocialPostHistory(blogPostId: number): Promise<SocialPostHistory[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db
    .select()
    .from(socialPostHistory)
    .where(eq(socialPostHistory.blogPostId, blogPostId))
    .orderBy(desc(socialPostHistory.createdAt))
    .execute();
}

export async function updateSocialPostStatus(
  id: number,
  status: "pending" | "posted" | "failed",
  updates?: Partial<InsertSocialPostHistory>
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(socialPostHistory)
    .set({
      status: status as any,
      ...updates,
    })
    .where(eq(socialPostHistory.id, id))
    .execute();
}

/**
 * Platform Settings Operations
 */

export async function savePlatformSettings(
  userId: number,
  platform: string,
  settings: Partial<InsertPlatformSettings>
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const existing = await db
    .select()
    .from(platformSettings)
    .where(
      and(
        eq(platformSettings.userId, userId),
        eq(platformSettings.platform, platform as any)
      )
    )
    .execute();

  if (existing.length > 0) {
    await db
      .update(platformSettings)
      .set(settings)
      .where(eq(platformSettings.id, existing[0].id))
      .execute();
  } else {
    await db.insert(platformSettings).values({
      userId,
      platform: platform as any,
      ...settings,
    });
  }
}

export async function getPlatformSettings(
  userId: number,
  platform: string
): Promise<PlatformSettings | undefined> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const settings = await db
    .select()
    .from(platformSettings)
    .where(
      and(
        eq(platformSettings.userId, userId),
        eq(platformSettings.platform, platform as any)
      )
    )
    .execute();

  return settings[0];
}

export async function getAllPlatformSettings(userId: number): Promise<PlatformSettings[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db
    .select()
    .from(platformSettings)
    .where(eq(platformSettings.userId, userId))
    .execute();
}

export async function deletePlatformSettings(
  userId: number,
  platform: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .delete(platformSettings)
    .where(
      and(
        eq(platformSettings.userId, userId),
        eq(platformSettings.platform, platform as any)
      )
    )
    .execute();
}
