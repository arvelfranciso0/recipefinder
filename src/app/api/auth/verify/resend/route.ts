import { db } from "@/db";
import { userVerifications } from "@/db/schema";
import { VerificationTypeEnum } from "@/enums/verification-type-enum";
import {
  generateHash,
  generateIdToken,
  generateSalt,
  genereteSixRandomCode,
} from "@/libs/utils";
import {
  getUserVerificationAlreadyExpiredById,
  getUserVerificationLastUseActiveById,
} from "@/repository/user_verification";
import { VerificationIdSchema } from "@/schemas/auth";
import { sendEmailVerification } from "@/services/email.server";
import { EmailVerificationCode } from "@/types/email-types";
import { and, eq, lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    // Parse the verification ID
    const parsedBody = VerificationIdSchema.safeParse(body);
    if (!parsedBody.success) {
      console.log("Invalid data");
      return NextResponse.json({ error: "Invalid data!" }, { status: 422 });
    }

    //Check if the token is not yet use and not yet deleted
    const userVerificatioData = await getUserVerificationLastUseActiveById(
      parsedBody.data.id,
    );

    if (!userVerificatioData) {
      console.log("Verification code is already used!");
      return NextResponse.json(
        { error: "Verification code is already used." },
        { status: 404 },
      );
    }

    const now = new Date();

    // Soft delete the old verifcation by the id
    await db
      .update(userVerifications)
      .set({ deletedAt: now })
      .where(and(eq(userVerifications.id, parsedBody.data.id)));

    //Generate a new code and hash the verification code and id token
    const prefix = "email-verification";
    const salt = await generateSalt();
    const newCode = await genereteSixRandomCode();
    const newHasCode = await generateHash(prefix, newCode, salt);
    const idToken = await generateIdToken();

    //Calculate the new expiredAt value
    const verificationExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const resetCodeTime = new Date(Date.now() + 5 * 60 * 1000);

    //Db transaction
    await db.transaction(async (trans) => {
      //Create a new verificaiton and save to db
      await trans.insert(userVerifications).values({
        email: userVerificatioData.email,
        hashVerificationCode: newHasCode,
        salt: salt,
        verificationExpiresAt,
        type: VerificationTypeEnum.EMAIL,
        id: idToken,
        userId: userVerificatioData.userId,
        resetCodeTime: resetCodeTime,
      });

      const emailData: EmailVerificationCode = {
        toEmail: userVerificatioData.email,
        verificationCode: newCode,
        subject: "Email Verification",
        idToken: idToken,
      };

      // send email
      await sendEmailVerification(emailData);
    });
    console.log("Code resend");
    return NextResponse.json(
      { message: "Code  resend successfully.", id: idToken },
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
