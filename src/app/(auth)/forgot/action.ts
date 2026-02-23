"use server";

import { db } from "@/db";
import { userVerifications } from "@/db/schema";
import { VerificationTypeEnum } from "@/enums/verification-type-enum";
import {
  generateHash,
  generateIdToken,
  generateSalt,
  generateSessionToken,
} from "@/libs/utils";
import { findByEmail } from "@/repository/user";
import { FortgotPasswordSchema } from "@/schemas/auth";
import { sendForgotPasswordLink } from "@/services/email.service";
import { ForgotPasswordForm } from "@/types/auth-types";
import { ForgotPasswordLink } from "@/types/email-types";

export async function forgotPasswordAction(
  forgotPasswordData: ForgotPasswordForm,
) {
  try {
    const result = FortgotPasswordSchema.safeParse(forgotPasswordData);

    if (!result.success) {
      return { message: "Invalid data.", success: false };
    }

    const userData = await findByEmail(result.data.email);
    if (!userData) {
      return { message: "Email does not exists!", success: false };
    }

    if (!userData.isEmailVerified) {
      return {
        message:
          "Your email isn’t verified yet. Please check your inbox for the verification code.",
        success: false,
      };
    }

    const tokenId = await generateIdToken();
    const randomId = await generateSessionToken();
    const prefix = "forgot-password";
    const salt = await generateSalt();
    const hashTokenId = await generateHash(prefix, tokenId, salt);
    const verificationExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await db.transaction(async (trans) => {
      await trans.insert(userVerifications).values({
        id: tokenId,
        email: result.data.email,
        hashVerificationCode: hashTokenId,
        verificationExpiresAt: verificationExpiresAt,
        salt: salt,
        type: VerificationTypeEnum.FORGOT_PASSWORD,
        userId: userData.id,
      });
      const resetEmailData: ForgotPasswordLink = {
        toEmail: result.data.email,
        forgot_password_link: `${process.env.APP_URL}forgot/${tokenId}`,
        subject: "Reset your RecipeFinder password",
      };

      await sendForgotPasswordLink(resetEmailData);
    });
  } catch (error) {
    console.log("Error:", error);
    return { message: "Internal server error!", success: false };
  }

  return {
    message: "Reset password is already sent to your inbox.",
    success: true,
  };
}
