"use server";

import { cookies } from "next/headers";
import { generateCryptoHash } from "@/libs/utils";
import { deleteAccessTokenByHashToken } from "@/repository/access_token";
export async function logoutAction(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_session")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const tokenHash = await generateCryptoHash(token);

  const deleted = await deleteAccessTokenByHashToken(tokenHash);

  if (!deleted) {
    throw new Error("Data not found!");
  }

  // clear cookie
  cookieStore.set("auth_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return true;
}
