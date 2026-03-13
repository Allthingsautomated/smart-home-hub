import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { photos } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "./_core/env";

// AWS S3 Client
const s3Client = new S3Client({
  region: ENV.awsRegion,
  credentials: {
    accessKeyId: ENV.awsAccessKeyId,
    secretAccessKey: ENV.awsSecretAccessKey,
  },
});

export const photosRouter = router({
  // List all photos
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        const allPhotos = await db
          .select()
          .from(photos)
          .orderBy(photos.uploadedAt)
          .limit(input.limit)
          .offset(input.offset);

        return {
          photos: allPhotos,
          total: allPhotos.length,
        };
      } catch (error) {
        throw new Error(`Failed to fetch photos: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  // Delete a photo
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        // Get the photo to get the S3 key
        const photo = await db
          .select()
          .from(photos)
          .where(eq(photos.id, input.id))
          .limit(1);

        if (photo.length === 0) {
          throw new Error("Photo not found");
        }

        const photoData = photo[0];

        // Delete from S3
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: ENV.awsS3Bucket,
            Key: photoData.s3Key,
          })
        );

        // Delete from database
        await db.delete(photos).where(eq(photos.id, input.id));

        return { success: true };
      } catch (error) {
        throw new Error(`Failed to delete photo: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  // Get a single photo
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        const photo = await db
          .select()
          .from(photos)
          .where(eq(photos.id, input.id))
          .limit(1);

        if (photo.length === 0) {
          throw new Error("Photo not found");
        }

        return photo[0];
      } catch (error) {
        throw new Error(`Failed to fetch photo: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),
});
