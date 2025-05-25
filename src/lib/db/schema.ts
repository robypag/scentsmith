import { pgTable, text, timestamp, uuid, integer, vector } from "drizzle-orm/pg-core";

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
  userId: uuid("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userFragrances = pgTable("user_fragrances", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  fragranceId: uuid("fragrance_id").references(() => fragrances.id).notNull(),
  collectionId: uuid("collection_id").references(() => collections.id),
  rating: integer("rating"),
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