"use server";

import {
  accessTokenInterface,
  verifyPasswordHashInterface,
} from "@/interface/data-interface";
import {
  generateCryptoHash,
  generateSessionToken,
  verifyPasswordHash,
} from "@/libs/utils";
import { saveAccessToken } from "@/repository/access_token";
import { findByEmail } from "@/repository/user";
import { LoginSchema } from "@/schemas/auth";
import { LoginForm } from "@/types/auth-types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginActions(formData: LoginForm) {
  try {
    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      return { message: "Invalid data." };
    }

    const userData = await findByEmail(result.data.email);
    if (!userData) {
      return { message: "Email does not exists!" };
    }

    if (!userData.isEmailVerified) {
      return {
        message:
          "Your email isn’t verified yet. Please check your inbox for the verification code.",
      };
    }

    const data: verifyPasswordHashInterface = {
      inputPassword: result.data.password,
      salt: userData.salt as string,
      hashPassword: userData.password,
    };

    //Verify the password
    const verifyPassword = await verifyPasswordHash(data);
    if (!verifyPassword) {
      return { message: "Wrong password" };
    }

    // Generate a Session Token
    const sessionToken = await generateSessionToken();

    // Hash the Session to Token
    const hashToken = await generateCryptoHash(sessionToken);

    const DAYS_30 = 30 * 24 * 60 * 60 * 1000;
    const HOURS_8 = 8 * 60 * 60 * 1000;
    const expiresAt = result.data.rememberMe
      ? new Date(Date.now() + DAYS_30) // 30 days
      : new Date(Date.now() + HOURS_8); // 8 hours
    const accessTokenData: accessTokenInterface = {
      token: hashToken,
      tokenType: "USER",
      tokenableId: userData.id,
      expiresAt: expiresAt,
      name: "auth",
      lastUsedAt: new Date(),
    };

    //Save the hash token on the database
    await saveAccessToken(accessTokenData);

    const now = new Date();
    const maxAge = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
    (await cookies()).set({
      httpOnly: true,
      name: "auth_session",
      value: sessionToken,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAge,
    });
  } catch (error) {
    console.log("Error:", error);
    return { message: "Internal server error!" };
  }

  redirect(`/home`);
}
