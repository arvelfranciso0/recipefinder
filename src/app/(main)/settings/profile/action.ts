"use server";
import { ToastType } from "@/components/ui/toast";
import { db } from "@/db";
import { MAX_SIZE } from "@/libs/constants";
import { updateUserAvatar, updateUserInformation } from "@/repository/user";
import { UpdateProfileSchema } from "@/schemas/profile";
import { AuthService } from "@/services/auth.service";
import { CloudinaryService } from "@/services/cloudinary.service";
import { ProfileEditForm } from "@/types/profile-type";

export async function updateProfileActions(
  formData: ProfileEditForm,
): Promise<{ message: string; status: ToastType }> {
  try {
    const validateData = UpdateProfileSchema.safeParse(formData);

    if (!validateData.success) {
      return { message: "Invalid data.", status: "error" };
    }

    const today = new Date();

    if (
      validateData.data.birthdate &&
      new Date(validateData.data.birthdate) > today
    ) {
      return { message: "Invalid birth date.", status: "error" };
    }

    const userService = new AuthService();
    const user = await userService.getAuthenticatedUser();

    if (!user) {
      return { message: "User not authenticated.", status: "error" };
    }

    await updateUserInformation(
      user.id,
      validateData.data.bio,
      validateData.data.birthdate,
      validateData.data.fullName,
    );
    return { message: "Profile updated successfully.", status: "success" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      message: "An error occurred while updating the profile.",
      status: "error",
    };
  }
}

export async function uploadProfilePictureAction(
  file: File,
  avatarPublicId?: string | null,
): Promise<{ message: string; status: ToastType }> {
  try {
    if (!file) {
      return { message: "No file provided", status: "error" };
    }

    if (file.size > MAX_SIZE) {
      return { message: "File size must be less than 2MB", status: "error" };
    }

    if (!file.type.startsWith("image/")) {
      return { message: "Only image files are allowed", status: "error" };
    }

    await db.transaction(async (trx) => {
      const userService = new AuthService();
      const user = await userService.getAuthenticatedUser();
      if (!user) {
        throw new Error("User not authenticated");
      }
      const cloudinaryService = new CloudinaryService();

      if (avatarPublicId) {
        const result = await cloudinaryService.deleteAvatar(avatarPublicId);

        if (!result) throw new Error("Error occured on deleting the avatar.");
      }
      const { secure_url: imageUrl, public_id: imagePublicId } =
        await cloudinaryService.uploadImage(file);

      await updateUserAvatar(trx, user.id, imageUrl, imagePublicId);
    });

    return {
      message: "Profile picture uploaded successfully.",
      status: "success",
    };
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return {
      message: "An error occurred while uploading the profile picture.",
      status: "error",
    };
  }
}
