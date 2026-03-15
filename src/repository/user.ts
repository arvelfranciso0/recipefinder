import { db, DBClient } from "@/db";
import { settings, users } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { MySqlTransaction } from "drizzle-orm/mysql-core";

export async function findByEmail(email: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), isNull(users.deletedAt)))
    .limit(1);

  return result;
}

export async function findByUserId(userId: number) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.id, userId), isNull(users.deletedAt)))
    .limit(1);

  return user;
}

export async function getUserSettingByUserId(userId: number) {
  const [user] = await db
    .select({
      id: users.id,
      role: users.role,
      email: users.email,
      isEmailVerified: users.isEmailVerified,
      fullName: users.fullName,
      theme: settings.theme,
      bio: users.bio,
      birthday: users.birthdate,
    })
    .from(users)
    .leftJoin(settings, eq(users.id, settings.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}

export async function updateUserInformation(
  userId: number,
  bio: string | null,
  birthdate: string | null,
  fullName?: string,
) {
  return await db
    .update(users)
    .set({
      fullName,
      birthdate,
      bio,
    })
    .where(eq(users.id, userId));
}

export async function getUserPasswordAndSaltByUserId(userId: number) {
  const [result] = await db
    .select({ password: users.password, salt: users.salt })
    .from(users)
    .where(and(eq(users.id, userId), isNull(users.deletedAt)))
    .limit(1);

  return result;
}

export async function updateUserPassword(
  db: DBClient,
  userId: number,
  newHashPassword: string,
  newSalt: string,
) {
  return await db
    .update(users)
    .set({
      password: newHashPassword,
      salt: newSalt,
    })
    .where(eq(users.id, userId));
}

export default {
  findByEmail,
  findByUserId,
  getUserSettingByUserId,
  updateUserInformation,
  getUserPasswordAndSaltByUserId,
  updateUserPassword,
};
