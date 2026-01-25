import {
  date,
  pgTable,
  text,
  timestamp,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
export const UserRole = pgEnum("user_role", ["USER", "ADMIN", "MODERATOR"]);
export const ThemeMode = pgEnum("theme_mode", ["DARK", "LIGHT"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  role: UserRole("role").notNull(),
  birthdate: date("birthdate"),
  salt: text("salt"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const favorites = pgTable("favorites", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  mealId: text("meal_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const settings = pgTable("settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  theme: ThemeMode("theme").notNull().default("LIGHT"),
  dietaryPreferences: text("dietary_preferences"),
  measurementUnit: text("measurement_unit"),
  notification: text("notification"),
});

export const userVerifications = pgTable("user_verifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  verificationCode: text("verification_code").notNull(),
  verificationTimestamp: timestamp("verification_timestamp")
    .defaultNow()
    .notNull(),
  verificationExpiresAt: timestamp("verification_expires_at"),
  type: text("type").default("email").notNull(),
});
