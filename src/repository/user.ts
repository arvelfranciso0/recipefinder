import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function findByEmail(email: string) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result;
}

export async function findByUserId(userId: number) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}

export default {
  findByEmail,
  findByUserId,
};
