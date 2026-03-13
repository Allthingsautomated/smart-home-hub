import { nanoid } from "nanoid";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { photos } from "../drizzle/schema";

// AWS S3 Client
const s3Client = new S3Client({
  region: ENV.awsRegion,
  credentials: {
    accessKeyId: ENV.awsAccessKeyId,
    secretAccessKey: ENV.awsSecretAccessKey,
  },
});

// Allowed MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const uploadRouter = router({
  uploadImage: publicProcedure
    .input(
      z.object({
        base64: z.string(),
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validate content type
        if (!ALLOWED_TYPES.includes(input.contentType)) {
          throw new Error(`Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`);
        }

        // Extract base64 data
        const base64Data = input.base64.includes(",")
          ? input.base64.split(",")[1]
          : input.base64;

        // Convert to buffer and check size
        const buffer = Buffer.from(base64Data, "base64");
        if (buffer.length > MAX_FILE_SIZE) {
          throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
        }

        // Generate unique S3 key
        const ext = input.filename.split(".").pop() ?? "jpg";
        const uniqueName = `${nanoid()}.${ext}`;
        const s3Key = `photos/${uniqueName}`;

        // Upload to S3
        await s3Client.send(
          new PutObjectCommand({
            Bucket: ENV.awsS3Bucket,
            Key: s3Key,
            Body: buffer,
            ContentType: input.contentType,
          })
        );

        // Construct S3 URL
        const s3Url = `https://${ENV.awsS3Bucket}.s3.${ENV.awsRegion}.amazonaws.com/${s3Key}`;

        // Save photo metadata to database
        const db = await getDb();
        if (db) {
          await db.insert(photos).values({
            filename: input.filename,
            s3Key,
            s3Url,
            contentType: input.contentType,
            fileSize: buffer.length,
          });
        }

        return { url: s3Url };
      } catch (error) {
        throw new Error(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),
});
