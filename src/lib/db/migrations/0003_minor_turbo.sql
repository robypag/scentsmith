ALTER TABLE "documents" ALTER COLUMN "metadata" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;