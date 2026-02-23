import { generateCryptoHash } from "@/libs/utils";
import { findHashTokenByToken } from "@/repository/access_token";
import { getUserSettingByUserId } from "@/repository/user";
import { cookies } from "next/headers";

export class AuthService {
  async getAuthenticatedUser() {
    const token = (await cookies()).get("auth_session")?.value;

    if (!token) return null;

    const tokenHash = await generateCryptoHash(token);

    const accessToken = await findHashTokenByToken(tokenHash);

    if (
      !accessToken ||
      accessToken.expiresAt < new Date() ||
      accessToken.deletedAt !== null
    ) {
      return null;
    }

    return getUserSettingByUserId(accessToken.tokenableId);
  }

  async isUserAuthenticated(): Promise<boolean> {
    const token = (await cookies()).get("auth_session")?.value;

    if (!token) return false;

    const tokenHash = await generateCryptoHash(token);

    const accessToken = await findHashTokenByToken(tokenHash);

    if (
      !accessToken ||
      accessToken.expiresAt < new Date() ||
      accessToken.deletedAt !== null
    ) {
      return false;
    }

    return true;
  }
}
