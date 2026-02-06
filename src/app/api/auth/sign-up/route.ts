import {
  generateHash,
  generateHashPassword,
  generateIdToken,
  generateSalt,
  genereteSixRandomCode,
  validateSchema,
} from "@/libs/utils";

import { NextRequest, NextResponse } from "next/server";
import { EnumRole } from "@/enums/role-enum";
import { db } from "@/db";
import { users, userVerifications } from "@/db/schema";
import { EmailVerificationCode } from "@/types/email-types";
import { VerificationTypeEnum } from "@/enums/verification-type-enum";
import { sendEmailVerification } from "@/services/email.server";
import { SingupSchema } from "@/schemas/auth";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());

    // const result = SingupSchema.parse(body);

    console.log("body", body);
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
  // try {
  //   const formData = await req.formData();
  //   const body = Object.fromEntries(formData.entries());
  //   // const email = body.get("email")?.toString() as string;
  //   // const fullName = body.get("fullName")?.toString() as string;
  //   // const password = body.get("password")?.toString() as string;
  //   // const confirmPassword = body.get("confirm_password")?.toString() as string;

  //   // if (confirmPassword !== password) {
  //   //   return NextResponse.json(
  //   //     { message: "Password and confirm password do not match" },
  //   //     { status: 400 },
  //   //   );
  //   // }

  //   const result = SingupSchema.parse(body)

  //   console.log("Result", result)

  //   const idToken = await generateIdToken();
  //   // DB Transaction
  //   await db.transaction(async (trans) => {
  //     const salt = await generateSalt();
  //     const sixRandomCode = await genereteSixRandomCode();
  //     const verificationExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  //     const hash = await generateHashPassword(password, salt);

  //     const userData = {
  //       email,
  //       fullName,
  //       role: EnumRole.USER,
  //       salt,
  //       password: hash,
  //     };

  //     // Save user on the database
  //     const [insertedUser] = await db
  //       .insert(users)
  //       .values(userData)
  //       .$returningId();

  //     const verifactionSalt = await generateSalt();
  //     const prefix = "email-verification";
  //     // Save verifaction code on the database
  //     await trans.insert(userVerifications).values({
  //       email: email,
  //       hashVerificationCode: await generateHash(
  //         prefix,
  //         sixRandomCode,
  //         verifactionSalt,
  //       ),
  //       salt: verifactionSalt,
  //       verificationExpiresAt,
  //       type: VerificationTypeEnum.EMAIL,
  //       id: idToken,
  //       userId: insertedUser.id,
  //     });

  //     const emailData: EmailVerificationCode = {
  //       toEmail: email,
  //       from: "demomailtrap.co",
  //       verificationCode: sixRandomCode,
  //       subject: "Email Verification",
  //       idToken: idToken,
  //     };

  //     // send email
  //     await sendEmailVerification(emailData);
  //   });

  //   const redirectUrl = new URL(`/verify/${idToken}`, req.url);

  //   return NextResponse.redirect(redirectUrl, 302);
  // } catch (error: any) {
  //   console.log(error);
  //   return NextResponse.json(
  //     { message: error?.message || "Internal Server Error" },
  //     { status: error?.status ? error?.status : error?.statusCode || 500 },
  //   );
  // }
}
