"use server";
import { SingupSchema } from "@/schemas/auth";
import { db } from "@/db";
import { users, userVerifications } from "@/db/schema";
import { EmailVerificationCode } from "@/types/email-types";
import { VerificationTypeEnum } from "@/enums/verification-type-enum";
import { sendEmailVerification } from "@/services/email.server";
import {
  generateHash,
  generateHashPassword,
  generateIdToken,
  generateSalt,
  genereteSixRandomCode,
} from "@/libs/utils";
import { EnumRole } from "@/enums/role-enum";
import { redirect } from "next/navigation";
import { handleError } from "@/error/errors";
import { SingupForm } from "@/types/auth-types";

export async function signUpActions(formData: SingupForm) {
  let idToken = "";
  try {
    const result = SingupSchema.safeParse(formData);

    if (!result.success) {
      throw new Error("Invalid data!");
    }

    idToken = await generateIdToken();
    // DB Transaction
    await db.transaction(async (trans) => {
      const salt = await generateSalt();
      const sixRandomCode = await genereteSixRandomCode();
      const verificationExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
      const hash = await generateHashPassword(result.data.password, salt);

      const userData = {
        email: result.data.email,
        fullName: result.data.fullName,
        role: EnumRole.USER,
        salt,
        password: hash,
      };

      // Save user on the database
      const [insertedUser] = await trans
        .insert(users)
        .values(userData)
        .$returningId();

      const verifactionSalt = await generateSalt();
      const prefix = "email-verification";
      // Save verifaction code on the database
      await trans.insert(userVerifications).values({
        email: result.data.email,
        hashVerificationCode: await generateHash(
          prefix,
          sixRandomCode,
          verifactionSalt,
        ),
        salt: verifactionSalt,
        verificationExpiresAt,
        type: VerificationTypeEnum.EMAIL,
        id: idToken,
        userId: insertedUser.id,
      });

      const emailData: EmailVerificationCode = {
        toEmail: result.data.email,
        from: "demomailtrap.co",
        verificationCode: sixRandomCode,
        subject: "Email Verification",
        idToken: idToken,
      };

      // send email
      await sendEmailVerification(emailData);
      return {
        message: "Account created successfully, please verify your email!",
      };
    });
  } catch (error: any) {
    console.log("Error: ", error);
    return handleError(error);
  }
  redirect(`/verify/${idToken}`);
}
