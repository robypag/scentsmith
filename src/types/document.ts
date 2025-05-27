import { z } from "zod";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { documents } from "@/lib/db/schema";

// Generate Zod schemas from Drizzle table
export const selectDocumentSchema = createSelectSchema(documents).extend({});
export const insertDocumentSchema = createInsertSchema(documents);

// Infer TypeScript types from Zod schemas
export type DocumentDTO = z.infer<typeof selectDocumentSchema>;
export type CreateDocumentDTO = z.infer<typeof insertDocumentSchema>;
export type UpdateDocumentDTO = Partial<CreateDocumentDTO>;
