import { db } from "@/db";
import { userVerifications } from "@/db/schema";
import { and, eq, gt, isNull, lt } from "drizzle-orm/sql";

export async function getUserVerificationAlreadyExpiredById(id: string) {
  const now = new Date();
  const [verification] = await db
    .select({
      id: userVerifications.id,
      hashCode: userVerifications.hashVerificationCode,
      email: userVerifications.email,
      salt: userVerifications.salt,
      userId: userVerifications.userId,
    })
    .from(userVerifications)
    .where(
      and(
        eq(userVerifications.id, id),
        isNull(userVerifications.lastUsedAt),
        isNull(userVerifications.deletedAt),
      ),
    )
    .limit(1);

  return verification;
}

export async function findUsersVerificationbByEmailAndHashVerificationCode(
  email: string,
  hashVerificationCode: string,
) {
  const now = new Date();
  const [verification] = await db
    .select()
    .from(userVerifications)
    .where(
      and(
        eq(userVerifications.email, email),
        eq(userVerifications.hashVerificationCode, hashVerificationCode),
        gt(userVerifications.verificationExpiresAt, now),
        isNull(userVerifications.deletedAt),
      ),
    )
    .limit(1);

  return verification;
}

export async function findUserVerificationById(id: string) {
  const now = new Date();
  const [verification] = await db
    .select({
      id: userVerifications.id,
      hashCode: userVerifications.hashVerificationCode,
      email: userVerifications.email,
      salt: userVerifications.salt,
      expireAt: userVerifications.verificationExpiresAt,
    })
    .from(userVerifications)
    .where(
      and(
        eq(userVerifications.id, id),
        gt(userVerifications.verificationExpiresAt, now),
        isNull(userVerifications.lastUsedAt),
        isNull(userVerifications.deletedAt),
      ),
    )
    .limit(1);

  return verification;
}

export async function setUserVerificationLastUseActive(id: string) {
  const now = new Date();
  return await db
    .update(userVerifications)
    .set({ lastUsedAt: now })
    .where(
      and(eq(userVerifications.id, id), isNull(userVerifications.deletedAt)),
    );
}

export async function getUserVerificationLastUseActiveById(id: string) {
  const [verification] = await db
    .select({
      id: userVerifications.id,
      lastUsedAt: userVerifications.lastUsedAt,
      email: userVerifications.email,
      salt: userVerifications.salt,
      expireAt: userVerifications.verificationExpiresAt,
      resetCodeTime: userVerifications.resetCodeTime,
      userId: userVerifications.userId,
    })
    .from(userVerifications)
    .where(
      and(
        eq(userVerifications.id, id),
        isNull(userVerifications.lastUsedAt),
        isNull(userVerifications.deletedAt),
      ),
    )
    .limit(1);

  return verification;
}

export async function setUserVerificationDeleteById(id: string) {
  const now = new Date();
  return await db
    .update(userVerifications)
    .set({ deletedAt: now })
    .where(
      and(
        eq(userVerifications.id, id),
        lt(userVerifications.verificationExpiresAt, now),
      ),
    );
}

export async function findUserVerificationByIdOnly(id: string) {
  const [verification] = await db
    .select({
      id: userVerifications.id,
      hashCode: userVerifications.hashVerificationCode,
      email: userVerifications.email,
      salt: userVerifications.salt,
      expireAt: userVerifications.verificationExpiresAt,
      lastUsed: userVerifications.lastUsedAt,
    })
    .from(userVerifications)
    .where(eq(userVerifications.id, id))
    .limit(1);

  return verification;
}

export default {
  getUserVerificationAlreadyExpiredById,
  getUserVerificationLastUseActiveById,
  setUserVerificationLastUseActive,
  findUserVerificationById,
  findUsersVerificationbByEmailAndHashVerificationCode,
  findUserVerificationByIdOnly,
};
