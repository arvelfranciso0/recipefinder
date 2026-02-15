import { db } from "@/db";
import { accessToken, userVerifications } from "@/db/schema";
import { accessTokenInterface } from "@/interface/data-interface";
import { and, eq, gt, isNull, lt } from "drizzle-orm";

export async function saveAccessToken(data: accessTokenInterface) {
  await db.insert(accessToken).values(data).$returningId();
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
  const now = new Date();
  const [access_token] = await db
    .update(accessToken)
    .set({ deletedAt: now })
    .where(
      and(
        eq(accessToken.token, hashSessionToken),
        isNull(accessToken.deletedAt),
      ),
    )
    .limit(1);

  return access_token;
}

export default {
  saveAccessToken,
  findHashTokenByToken,
};
