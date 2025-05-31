ALTER TABLE "embeddings" ADD COLUMN "topics" text[] DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "embeddings" ADD COLUMN "tags" text[] DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "embeddings" ADD COLUMN "chemicals" text[] DEFAULT ARRAY[]::text[];