"use server";
import { ToastType } from "@/components/ui/toast";
import { db } from "@/db";
import {
  generateHashPassword,
  generateSalt,
  verifyPasswordHash,
} from "@/libs/utils";
import {
  getUserPasswordAndSaltByUserId,
  updateUserPassword,
} from "@/repository/user";
import { UpdateUserPasswordSchema } from "@/schemas/user";
import { AuthService } from "@/services/auth.service";
import { UserUpdatePassordForm } from "@/types/user-types";

export async function updatePasswordActions(
  formData: UserUpdatePassordForm,
): Promise<{ message: string; status: ToastType }> {
  const userService = new AuthService();
  const user = await userService.getAuthenticatedUser();

  if (!user) {
    return { message: "User not authenticated.", status: "error" };
  }

  const validateDate = UpdateUserPasswordSchema.safeParse(formData);

  if (!validateDate.success) {
    return { message: "Invalid data.", status: "error" };
  }

  if (validateDate.data.newPassword !== validateDate.data.confirmNewPassword) {
    return {
      message: "New password and confirm new password do not match.",
      status: "error",
    };
  }

  try {
    const { currentPassword, newPassword } = validateDate.data;
    const userPasswordData = await getUserPasswordAndSaltByUserId(user.id);

    if (!userPasswordData) {
      return { message: "User not found.", status: "error" };
    }

    const { password: storedPassword, salt } = userPasswordData;

    const verifyPasswordData = {
      inputPassword: currentPassword,
      salt: salt as string,
      hashPassword: storedPassword,
    };

    const verifyPassword = await verifyPasswordHash(verifyPasswordData);
    if (!verifyPassword) {
      return { message: "Wrong password", status: "error" };
    }

    const newSalt = await generateSalt();
    const newHashPassword = await generateHashPassword(newPassword, newSalt);

    await db.transaction(async (trx) => {
      const updatePassword = await updateUserPassword(
        trx,
        user.id,
        newHashPassword,
        newSalt,
      );

      if (!updatePassword) {
        return { message: "Failed to update the password.", status: "error" };
      }
    });

    return { message: "Password updated successfully.", status: "success" };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      message: "An error occurred while updating the password.",
      status: "error",
    };
  }
}
