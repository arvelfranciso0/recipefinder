import { db } from "@/db";
import { settings, users } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";

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
    })
    .from(users)
    .leftJoin(settings, eq(users.id, settings.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}

export default {
  findByEmail,
  findByUserId,
};
