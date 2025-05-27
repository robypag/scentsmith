-- Add status column to documents table
ALTER TABLE "documents" ADD COLUMN "status" text DEFAULT 'pending' NOT NULL;