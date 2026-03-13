import { nanoid } from "nanoid";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as fs from "fs";
import * as path from "path";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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
        const ext = input.filename.split(".").pop() ?? "jpg";
        const uniqueName = `${nanoid()}.${ext}`;
        const filePath = path.join(uploadsDir, uniqueName);

        // Extract base64 data
        const base64Data = input.base64.includes(",")
          ? input.base64.split(",")[1]
          : input.base64;

        // Write file to disk
        const buffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(filePath, buffer);

        // Return the public URL
        const url = `/uploads/${uniqueName}`;
        return { url };
      } catch (error) {
        throw new Error(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),
});
