import { db } from "@/db";
import { accessToken, userVerifications } from "@/db/schema";
import { accessTokenInterface } from "@/interface/data-interface";
import { and, eq, gt, isNull } from "drizzle-orm";

export async function saveAccessToken(data: accessTokenInterface) {
  await db.insert(accessToken).values(data);
}

export async function findHashTokenByToken(hashSessionToken: string) {
  const [access_token] = await db
    .select()
    .from(accessToken)
    .where(
      and(
        eq(accessToken.token, hashSessionToken),
        isNull(accessToken.deletedAt),
      ),
    )
    .limit(1);

  return access_token;
}

export async function deleteAccessTokenByHashToken(hashSessionToken: string) {
  const [access_token] = await db
    .delete(accessToken)
    .where(
      and(
        eq(accessToken.token, hashSessionToken),
        isNull(accessToken.deletedAt),
      ),
    )
    .limit(1);

  return access_token;
}

export async function findUserAccessTokenByEmailAndHashVerificationCode(
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

export async function findUserAccessTokenById(id: string) {
  const now = new Date();
  const [verification] = await db
    .select({
      id: userVerifications.id,
      hashCode: userVerifications.hashVerificationCode,
      email: userVerifications.email,
      salt: userVerifications.salt,
    })
    .from(userVerifications)
    .where(
      and(
        eq(userVerifications.id, id),
        gt(userVerifications.verificationExpiresAt, now),
        isNull(userVerifications.deletedAt),
      ),
    )
    .limit(1);

  return verification;
}

export default {
  saveAccessToken,
  findHashTokenByToken,
};

export async function setAccessTokenLastUseActive(id: string) {
  const now = new Date();
  return await db
    .update(userVerifications)
    .set({ lastUsedAt: now })
    .where(
      and(eq(userVerifications.id, id), isNull(userVerifications.deletedAt)),
    );
}
