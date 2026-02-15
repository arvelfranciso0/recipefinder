"use server";
import { db } from "@/db";
import { users, userVerifications } from "@/db/schema";
import { generateHashPassword, generateSalt, verifyHash } from "@/libs/utils";
import { findUserVerificationById } from "@/repository/user_verification";
import { NewPasswordShcema } from "@/schemas/auth";
import { NewPasswordForm } from "@/types/auth-types";
import { and, eq, isNull } from "drizzle-orm";

export async function updateNewPasswordAction(
  id: string,
  data: NewPasswordForm,
) {
  try {
    // find if the verification id exists
    const userVerificationsData = await findUserVerificationById(id);

    if (!userVerificationsData) {
      return { message: "Link is expired.", success: false };
    }

    // verify the token id
    const prefix = "forgot-password";
    const isIdMatch = await verifyHash(
      prefix,
      id,
      userVerificationsData.hashCode,
      userVerificationsData.salt,
    );

    if (!isIdMatch) {
      return { message: "Token is invalid.", success: false };
    }

    // parse the form data
    const result = NewPasswordShcema.safeParse(data);

    if (!result.success) {
      return { message: "Invalid data.", success: false };
    }

    if (result.data.confirmPassword !== result.data.password) {
      return { message: "Password does not match!", success: false };
    }

    await db.transaction(async (trans) => {
      const now = new Date();
      // update the user token
      await trans
        .update(userVerifications)
        .set({ lastUsedAt: now, deletedAt: now })
        .where(
          and(
            eq(userVerifications.id, id),
            isNull(userVerifications.deletedAt),
          ),
        );

      // update the user password
      const salt = await generateSalt();
      const hash = await generateHashPassword(result.data.password, salt);
      await trans
        .update(users)
        .set({ password: hash, salt })
        .where(eq(users.email, userVerificationsData.email));
    });
  } catch (error) {
    console.log("Error:", error);
    return { message: "Internal server error!", success: false };
  }
  return {
    message: "You have successfully reset your password. ",
    success: true,
  };
}
