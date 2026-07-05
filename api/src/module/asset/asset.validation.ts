import { z } from "zod";

export const createAssetSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    category: z.string().optional(),
    url: z.string().url("Invalid URL").optional(),
    size: z.string().optional(),
    dimensions: z.string().optional(),
    type: z.string().optional(),
    mimeType: z.string().optional(),
  }),
}).strict();
