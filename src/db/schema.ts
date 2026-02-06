import { sql } from "drizzle-orm";
import {
  boolean,
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
  isEmailVerified: boolean("is_email_verified").default(false),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
  deletedAt: timestamp("deleted_at")
    .default(sql`null`)
    .$type<Date | null>(),
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
  deletedAt: timestamp("deleted_at")
    .default(sql`null`)
    .$type<Date | null>(),
});

export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  theme: mysqlEnum("theme", ["DARK", "LIGHT", "SYSTEM"])
    .notNull()
    .default("LIGHT"),
  dietaryPreferences: varchar("dietary_preferences", { length: 100 }),
  measurementUnit: varchar("measurement_unit", { length: 10 }),
  notification: varchar("notification", { length: 10 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
  deletedAt: timestamp("deleted_at")
    .default(sql`null`)
    .$type<Date | null>(),
});

export const userVerifications = mysqlTable("user_verifications", {
  id: varchar("id", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  hashVerificationCode: text("hash_verification_code").notNull(),
  salt: text("salt").notNull(),
  verificationExpiresAt: timestamp("verification_expires_at"),
  lastUsedAt: timestamp("last_used_at"),
  type: mysqlEnum("type", VerificationType).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
  deletedAt: timestamp("deleted_at")
    .default(sql`null`)
    .$type<Date | null>(),
});

export const accessToken = mysqlTable("access_token", {
  id: int("id").autoincrement().primaryKey(),
  token: text("token").notNull(),
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
  deletedAt: timestamp("deleted_at")
    .default(sql`null`)
    .$type<Date | null>(),
});
