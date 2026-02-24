import { sql } from "drizzle-orm";
import {
  boolean,
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
  mealId: int("meal_id")
    .references(() => meals.id)
    .notNull(),
  mealName: text("meal_name"),
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
    .references(() => users.id),
  hashVerificationCode: text("hash_verification_code").notNull(),
  salt: text("salt").notNull(),
  verificationExpiresAt: timestamp("verification_expires_at"),
  lastUsedAt: timestamp("last_used_at"),
  type: mysqlEnum("type", VerificationType).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  resetCodeTime: timestamp("reset_code_time"),
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
    .references(() => users.id),
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

export const meals = mysqlTable("meals", {
  id: int("idMeal").primaryKey().notNull(),
  name: varchar("strMeal", { length: 255 }).notNull(),
  category: varchar("strCategory", { length: 100 }),
  area: varchar("strArea", { length: 100 }),
  instructions: text("strInstructions"),
  thumbnail: text("strMealThumb"),
  tags: text("strTags"),
  youtube: text("strYoutube"),
  source: text("strSource"),
  alternate: text("strMealAlternate"),
  ingredient1: varchar("strIngredient1", { length: 100 }),
  ingredient2: varchar("strIngredient2", { length: 100 }),
  ingredient3: varchar("strIngredient3", { length: 100 }),
  ingredient4: varchar("strIngredient4", { length: 100 }),
  ingredient5: varchar("strIngredient5", { length: 100 }),
  ingredient6: varchar("strIngredient6", { length: 100 }),
  ingredient7: varchar("strIngredient7", { length: 100 }),
  ingredient8: varchar("strIngredient8", { length: 100 }),
  ingredient9: varchar("strIngredient9", { length: 100 }),
  ingredient10: varchar("strIngredient10", { length: 100 }),
  ingredient11: varchar("strIngredient11", { length: 100 }),
  ingredient12: varchar("strIngredient12", { length: 100 }),
  ingredient13: varchar("strIngredient13", { length: 100 }),
  ingredient14: varchar("strIngredient14", { length: 100 }),
  ingredient15: varchar("strIngredient15", { length: 100 }),
  ingredient16: varchar("strIngredient16", { length: 100 }),
  ingredient17: varchar("strIngredient17", { length: 100 }),
  ingredient18: varchar("strIngredient18", { length: 100 }),
  ingredient19: varchar("strIngredient19", { length: 100 }),
  ingredient20: varchar("strIngredient20", { length: 100 }),

  measure1: varchar("strMeasure1", { length: 255 }),
  measure2: varchar("strMeasure2", { length: 255 }),
  measure3: varchar("strMeasure3", { length: 255 }),
  measure4: varchar("strMeasure4", { length: 255 }),
  measure5: varchar("strMeasure5", { length: 255 }),
  measure6: varchar("strMeasure6", { length: 255 }),
  measure7: varchar("strMeasure7", { length: 255 }),
  measure8: varchar("strMeasure8", { length: 255 }),
  measure9: varchar("strMeasure9", { length: 255 }),
  measure10: varchar("strMeasure10", { length: 255 }),
  measure11: varchar("strMeasure11", { length: 255 }),
  measure12: varchar("strMeasure12", { length: 255 }),
  measure13: varchar("strMeasure13", { length: 255 }),
  measure14: varchar("strMeasure14", { length: 255 }),
  measure15: varchar("strMeasure15", { length: 255 }),
  measure16: varchar("strMeasure16", { length: 255 }),
  measure17: varchar("strMeasure17", { length: 255 }),
  measure18: varchar("strMeasure18", { length: 255 }),
  measure19: varchar("strMeasure19", { length: 255 }),
  measure20: varchar("strMeasure20", { length: 255 }),
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
