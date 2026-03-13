import { nanoid } from "nanoid";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

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

      const { url } = await storagePut(key, buffer, input.contentType);
      return { url };
    }),
});
