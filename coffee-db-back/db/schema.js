import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// USERS -----------------------------------------------------

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

// GEAR -----------------------------------------------------

export const gear = pgTable("gear", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  type: text("type"), // grinder, scale, kettle, espresso machine, etc.
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
});

// ROASTERS --------------------------------------------------

export const roasters = pgTable("roasters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  country: text("country"),
  website: text("website"),
  created_at: timestamp("created_at").defaultNow(),
});

// BEANS -----------------------------------------------------

export const beans = pgTable("beans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  origin: text("origin"),
  variety: text("variety"),
  process: text("process"),
  roaster_id: uuid("roaster_id").references(() => roasters.id, {
    onDelete: "set null",
  }),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
});

// ROAST PROFILES --------------------------------------------

export const roasts = pgTable("roasts", {
  id: uuid("id").primaryKey().defaultRandom(),
  bean_id: uuid("bean_id").references(() => beans.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  roast_level: text("roast_level"), // light / medium / dark
  date_roasted: timestamp("date_roasted"),
  created_at: timestamp("created_at").defaultNow(),
});

// RECIPES ----------------------------------------------------

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  description: text("description"),
  bean_id: uuid("bean_id").references(() => beans.id, { onDelete: "set null" }),
  roast_id: uuid("roast_id").references(() => roasts.id, {
    onDelete: "set null",
  }),
  gear_id: uuid("gear_id").references(() => gear.id, { onDelete: "set null" }),
  created_at: timestamp("created_at").defaultNow(),
});

// RECIPE STEPS ----------------------------------------------

export const recipe_steps = pgTable("recipe_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  recipe_id: uuid("recipe_id")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  step_number: integer("step_number").notNull(),
  instruction: text("instruction").notNull(),
  // Placeholder column for future recipe_step_media table
  media_placeholder: text("media_placeholder"),
});
