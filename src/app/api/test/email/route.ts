// import { db } from "@/db";
// import { userVerifications } from "@/db/schema";
// import { VerificationTypeEnum } from "@/enums/verification-type-enum";
// import {
//   generateHashPassword,
//   generateIdToken,
//   generateSalt,
//   genereteSixRandomCode,
// } from "@/libs/utils";
// import {
//   sendEmailVerification,
// } from "@/services/email.service";
// import { EmailVerificationCode } from "@/types/email-types";
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const sixRandomCode = await genereteSixRandomCode();
//   const salt = await generateSalt();
//   const verificationExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
//   const idToken = await generateIdToken();
//   try {
//     await db.transaction(async (tx) => {
//       // Insert verification code
//       await tx.insert(userVerifications).values({
//         email: body.email,
//         hashVerificationCode: await generateHashPassword(sixRandomCode, salt),
//         salt,
//         verificationExpiresAt,
//         type: VerificationTypeEnum.EMAIL,
//         id: idToken,
//         userId: 1,
//       });

//       // Send email
//       const emailData: EmailVerificationCode = {
//         toEmail: body.email,
//         verificationCode: sixRandomCode,
//         subject: "Email Verification",
//         idToken,
//       };

//       const forgotPassword: ForgotPasswordCode = {
//         toEmail: body.email,
//         resetCode: sixRandomCode,
//         subject: "Reset Password Code",
//       };

//       // await sendEmailVerification(emailData);
//       await sendForgotPasswordCode(forgotPassword);
//     });

//     return NextResponse.json({ message: "Email sent" });
//   } catch (error) {
//     console.error("Error sending verification:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }
