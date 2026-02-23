"use server";
import { AuthService } from "@/services/auth.service";
import { UserSettings } from "@/types/user-types";

export async function getUser(): Promise<UserSettings | null> {
  const authService = new AuthService();
  const user = await authService.getAuthenticatedUser();

  return user;
}
