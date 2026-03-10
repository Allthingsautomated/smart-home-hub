import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET!;

export const uploadRouter = router({
  uploadImage: publicProcedure
    .input(
      z.object({
        base64: z.string(), // data:image/...;base64,<data>
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const ext = input.filename.split(".").pop() ?? "jpg";
      const key = `uploads/${nanoid()}.${ext}`;
      const base64Data = input.base64.includes(",")
        ? input.base64.split(",")[1]
        : input.base64;
      const buffer = Buffer.from(base64Data, "base64");

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: input.contentType,
        })
      );

      const url = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      return { url };
    }),
});
