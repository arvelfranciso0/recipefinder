"use server";
import { ToastType } from "@/components/ui/toast";
import { updateUserInformation } from "@/repository/user";
import { UpdateProfileSchema } from "@/schemas/profile";
import { AuthService } from "@/services/auth.service";
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
