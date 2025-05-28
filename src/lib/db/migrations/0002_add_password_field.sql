-- Add password field as nullable first
ALTER TABLE "users" ADD COLUMN "password" text;

-- Set a default hashed password for existing users (bcrypt hash of "changeme123")
UPDATE "users" SET "password" = '$2a$12$LQv3c1yqBwlVHpPjrjHNUOCjmxCPhTVrmJqxdJfIXfST8uFmy/Si.' WHERE "password" IS NULL;

-- Make password field required
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;