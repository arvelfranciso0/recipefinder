import { email } from "@/validator/validator";
import { sql } from "drizzle-orm";
import {
  date,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const UserType = ["USER", "ADMIN", "MODERATOR"] as const;
export const VerificationType = ["EMAIL", "FORGOT_PASSWORD"] as const;
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  password: text("password").notNull(),
  role: mysqlEnum("role", UserType).notNull(),
  birthdate: varchar("birthdate", { length: 255 }),
  salt: text("salt"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  mealId: text("meal_id"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  theme: mysqlEnum("theme", ["DARK", "LIGHT"]).notNull().default("LIGHT"),
  dietaryPreferences: varchar("dietary_preferences", { length: 100 }),
  measurementUnit: varchar("measurement_unit", { length: 10 }),
  notification: varchar("notification", { length: 10 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const userVerifications = mysqlTable("user_verifications", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  hashVerificationCode: varchar("hash_verification_code", {
    length: 100,
  }).notNull(),
  salt: text("salt"),
  verificationExpiresAt: timestamp("verification_expires_at"),
  type: mysqlEnum("type", VerificationType).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const accessToken = mysqlTable("access_token", {
  id: int("id").autoincrement().primaryKey(),
  token: varchar("token", { length: 100 }).notNull().unique(),
  tokenType: mysqlEnum("token_type", UserType).notNull(),
  name: varchar("name", { length: 50 }),
  tokenableId: int("tokenable_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  expiresAt: timestamp("expires_at").notNull(),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});
