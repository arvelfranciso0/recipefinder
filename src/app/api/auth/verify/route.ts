import { db } from "@/db";
import { users, userVerifications } from "@/db/schema";
import { validateSchema, verifyHash } from "@/libs/utils";
import { findUserAccessTokenById } from "@/repository/access_token";
// import { verifySchema } from "@/schemas/auth";
import { and, eq, isNull } from "drizzle-orm";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // const parsedBody = validateSchema(verifySchema, body);

  // try {
  //   if (!parsedBody.valid) {
  //     throw new ApiError(422, "Invalid data!");
  //   }

  //   // Get the database hash verification code and salt
  //   const getUserAccessToken = await findUserAccessTokenById(
  //     parsedBody.data.id,
  //   );

  //   // Check compare the hash
  //   const prefix = "email-verification";
  //   const isCodeMatch = await verifyHash(
  //     prefix,
  //     parsedBody.data.code,
  //     getUserAccessToken.hashCode,
  //     getUserAccessToken.salt,
  //   );

  //   if (!isCodeMatch) {
  //     throw new ApiError(422, "Code not match!");
  //   }

  //   await db.transaction(async (trans) => {
  //     const now = new Date();
  //     await trans
  //       .update(userVerifications)
  //       .set({ lastUsedAt: now, deletedAt: now })
  //       .where(
  //         and(
  //           eq(userVerifications.id, getUserAccessToken.id),
  //           isNull(userVerifications.deletedAt),
  //         ),
  //       );

  //     await trans
  //       .update(users)
  //       .set({ isEmailVerified: true })
  //       .where(
  //         and(
  //           eq(users.email, getUserAccessToken.email),
  //           isNull(users.deletedAt),
  //         ),
  //       );
  //   });
  //   return NextResponse.json(
  //     { message: "Verified successully!" },
  //     { status: 200 },
  //   );
  // } catch (error: any) {
  //   console.log(error);
  //   return NextResponse.json(
  //     { message: error?.message || "Internal Server Error" },
  //     { status: error?.status ? error?.status : error?.statusCode || 500 },
  //   );
  // }
}
