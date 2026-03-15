import { AuthService } from "@/services/auth.service";

export async function getUserProfile() {
  const userService = new AuthService();
  const user = await userService.getAuthenticatedUser();
  return user;
}
