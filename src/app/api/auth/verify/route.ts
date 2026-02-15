import { db } from "@/db";
import { users, userVerifications } from "@/db/schema";
import { verifyHash } from "@/libs/utils";
import { findUserVerificationByIdOnly } from "@/repository/user_verification";
import { VerificationSchema } from "@/schemas/auth";
import { and, eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const parsedBody = VerificationSchema.safeParse(body);
    const now = new Date();
    if (!parsedBody.success) {
      return NextResponse.json({ error: "Invalid data!" }, { status: 422 });
    }

    const userVerificationData = await findUserVerificationByIdOnly(
      parsedBody.data.id,
    );

    // Check if the tokenId is already used
    if (userVerificationData.lastUsed != null) {
      return NextResponse.json(
        { error: "Verification code is already used." },
        { status: 404 },
      );
    }

    // Check if the token is expired
    if (!userVerificationData.expireAt || userVerificationData.expireAt < now) {
      return NextResponse.json(
        { error: "Verication code is expired" },
        { status: 404 },
      );
    }

    // Check compare the hash
    const prefix = "email-verification";
    const isCodeMatch = await verifyHash(
      prefix,
      parsedBody.data.code,
      userVerificationData.hashCode,
      userVerificationData.salt,
    );

    if (!isCodeMatch) {
      return NextResponse.json({ error: "Code not match!" }, { status: 422 });
    }

    await db.transaction(async (trans) => {
      await trans
        .update(userVerifications)
        .set({ lastUsedAt: now, deletedAt: now })
        .where(
          and(
            eq(userVerifications.id, userVerificationData.id),
            isNull(userVerifications.deletedAt),
          ),
        );

      await trans
        .update(users)
        .set({ isEmailVerified: true })
        .where(
          and(
            eq(users.email, userVerificationData.email),
            isNull(users.deletedAt),
          ),
        );
    });
    return NextResponse.json(
      { message: "Verified successully!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: error?.status ? error?.status : error?.statusCode || 500 },
    );
  }
}
