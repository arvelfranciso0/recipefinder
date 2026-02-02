import { db } from "@/db";
import { accessToken } from "@/db/schema";
import { accessTokenInterface } from "@/interface/data-interface";
import { eq } from "drizzle-orm";

export async function saveAccessToken(data: accessTokenInterface) {
  await db.insert(accessToken).values(data);
}

export async function findHashTokenByToken(hashSessionToken: string) {
  const [access_token] = await db
    .select()
    .from(accessToken)
    .where(eq(accessToken.token, hashSessionToken))
    .limit(1);

  return access_token;
}

export async function deleteAccessTokenByHashToken(hashSessionToken: string) {
  const [access_token] = await db
    .delete(accessToken)
    .where(eq(accessToken.token, hashSessionToken))
    .limit(1);

  return access_token;
}

export default {
  saveAccessToken,
  findHashTokenByToken,
};
