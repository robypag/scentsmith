import { pgTable, text, timestamp, index, integer, vector, decimal, boolean, jsonb, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").unique().notNull(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fragrances = pgTable("fragrances", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    description: text("description"),
    notes: text("notes").array(),
    concentration: text("concentration"),
    yearReleased: integer("year_released"),
    embedding: vector("embedding", { dimensions: 1536 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userFragrances = pgTable("user_fragrances", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    fragranceId: uuid("fragrance_id")
        .references(() => fragrances.id)
        .notNull(),
    collectionId: uuid("collection_id").references(() => collections.id),
    rating: integer("rating"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// New tables for expert fragrance makers
export const ingredients = pgTable("ingredients", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    casNumber: text("cas_number"),
    ifraCategory: text("ifra_category"),
    maxConcentration: decimal("max_concentration", { precision: 5, scale: 2 }),
    safetyNotes: text("safety_notes"),
    supplier: text("supplier"),
    cost: decimal("cost", { precision: 10, scale: 2 }),
    odorProfile: text("odor_profile"),
    volatility: text("volatility"), // top, middle, base
    embedding: vector("embedding", { dimensions: 1536 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const formulae = pgTable("formulae", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    version: text("version").default("1.0"),
    description: text("description"),
    createdBy: uuid("created_by")
        .references(() => users.id)
        .notNull(),
    status: text("status").default("draft"), // draft, testing, approved, archived
    totalConcentration: decimal("total_concentration", { precision: 5, scale: 2 }),
    batchSize: decimal("batch_size", { precision: 10, scale: 2 }),
    notes: text("notes"),
    expirationDate: timestamp("expiration_date"),
    isCompliant: boolean("is_compliant").default(true),
    lastComplianceCheck: timestamp("last_compliance_check"),
    embedding: vector("embedding", { dimensions: 1536 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const formulaIngredients = pgTable("formula_ingredients", {
    id: uuid("id").defaultRandom().primaryKey(),
    formulaId: uuid("formula_id")
        .references(() => formulae.id)
        .notNull(),
    ingredientId: uuid("ingredient_id")
        .references(() => ingredients.id)
        .notNull(),
    percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// * Main Documents:
export const documents = pgTable("documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    type: text("type").notNull(), // legal, formula, research, sds, etc.
    uploadedBy: uuid("uploaded_by")
        .references(() => users.id)
        .notNull(),
    fileUrl: text("file_url"),
    metadata: jsonb("metadata"),
    tags: text("tags").array(),
    summarization: text("summarization"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// * Document Resources (Chunks):
export const resources = pgTable("resources", {
    id: uuid("id").defaultRandom().primaryKey(),
    documentId: uuid("document_id").references(() => documents.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    pageNumber: integer("page_number").notNull(),
    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
    updatedAt: timestamp("updated_at")
        .notNull()
        .default(sql`now()`),
});

// * Embeddings:
export const embeddings = pgTable(
    "embeddings",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        resourceId: uuid("resource_id").references(() => resources.id, { onDelete: "cascade" }),
        content: text("content").notNull(),
        embedding: vector("embedding", { dimensions: 1536 }).notNull(),
    },
    (table) => [index("embeddingIndex").using("hnsw", table.embedding.op("vector_cosine_ops"))],
);

export const complianceRules = pgTable("compliance_rules", {
    id: uuid("id").defaultRandom().primaryKey(),
    region: text("region").notNull(), // EU, US, etc.
    regulation: text("regulation").notNull(), // IFRA, FDA, etc.
    ingredientId: uuid("ingredient_id").references(() => ingredients.id),
    maxConcentration: decimal("max_concentration", { precision: 5, scale: 2 }),
    restrictions: text("restrictions"),
    effectiveDate: timestamp("effective_date").notNull(),
    expirationDate: timestamp("expiration_date"),
    documentId: uuid("document_id").references(() => documents.id),
    embedding: vector("embedding", { dimensions: 1536 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const formulaTests = pgTable("formula_tests", {
    id: uuid("id").defaultRandom().primaryKey(),
    formulaId: uuid("formula_id")
        .references(() => formulae.id)
        .notNull(),
    testType: text("test_type").notNull(), // stability, skin_test, performance, etc.
    results: jsonb("results"),
    passed: boolean("passed"),
    testDate: timestamp("test_date").notNull(),
    testedBy: uuid("tested_by")
        .references(() => users.id)
        .notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Fragrance = typeof fragrances.$inferSelect;
export type NewFragrance = typeof fragrances.$inferInsert;

export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;

export type UserFragrance = typeof userFragrances.$inferSelect;
export type NewUserFragrance = typeof userFragrances.$inferInsert;

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;

export type Formula = typeof formulae.$inferSelect;
export type NewFormula = typeof formulae.$inferInsert;

export type FormulaIngredient = typeof formulaIngredients.$inferSelect;
export type NewFormulaIngredient = typeof formulaIngredients.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export type DocumentResource = typeof resources.$inferSelect;
export type NewDocumentResource = typeof resources.$inferInsert;

export type ComplianceRule = typeof complianceRules.$inferSelect;
export type NewComplianceRule = typeof complianceRules.$inferInsert;

export type FormulaTest = typeof formulaTests.$inferSelect;
export type NewFormulaTest = typeof formulaTests.$inferInsert;
