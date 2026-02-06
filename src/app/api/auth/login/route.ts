import {
  accessTokenInterface,
  verifyPasswordHashInterface,
} from "@/interface/data-interface";
import {
  generateSessionToken,
  generateCryptoHash,
  validateSchema,
  verifyPasswordHash,
} from "@/libs/utils";
import { saveAccessToken } from "@/repository/access_token";
import { findByEmail } from "@/repository/user";
// import { loginSchema } from "@/schemas/auth";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // try {
  //   const body = await req.json();
  //   const parsedBody = validateSchema(loginSchema, body);
  //   if (!parsedBody.valid) {
  //     throw new ApiError(422, "Invalid data!");
  //   }
  //   // Check if email exists
  //   const userData = await findByEmail(parsedBody.data.email);
  //   if (!userData) {
  //     throw new ApiError(401, "Data not found!");
  //   }
  //   const data: verifyPasswordHashInterface = {
  //     inputPassword: parsedBody.data.password,
  //     salt: userData.salt as string,
  //     hashPassword: userData.password,
  //   };
  //   //Verify the password
  //   const verifyPassword = await verifyPasswordHash(data);
  //   if (!verifyPassword) {
  //     throw new ApiError(401, "Data not found!");
  //   }
  //   // Generate a Session Token
  //   const sessionToken = await generateSessionToken();
  //   // Hash the Session to Token
  //   const hashToken = await generateCryptoHash(sessionToken);
  //   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //   const accessTokenData: accessTokenInterface = {
  //     token: hashToken,
  //     tokenType: "USER",
  //     tokenableId: userData.id,
  //     expiresAt: expiresAt,
  //     name: "auth",
  //   };
  //   //Save the hash token on the database
  //   await saveAccessToken(accessTokenData);
  //   const response = NextResponse.json(
  //     { message: "Login Successfully!", token: sessionToken },
  //     { status: 200 },
  //   );
  //   const now = new Date();
  //   const maxAge = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
  //   // Set HTTP-only cookie
  //   response.cookies.set("auth_session", sessionToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //     path: "/",
  //     maxAge: maxAge,
  //   });
  //   return response;
  // } catch (error: any) {
  //   console.log(error);
  //   return NextResponse.json(
  //     { message: error?.message || "Internal Server Error" },
  //     { status: error?.status ? error?.status : error?.statusCode || 500 },
  //   );
  // }
}
