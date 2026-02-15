import { generateCryptoHash } from "@/libs/utils";
import { findHashTokenByToken } from "@/repository/access_token";
import { getUserSettingByUserId } from "@/repository/user";
import { UserSettings } from "@/types/user-types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_session")?.value;

  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const tokenHash = await generateCryptoHash(token);

  const access_token = await findHashTokenByToken(tokenHash);
  if (
    !access_token ||
    access_token.expiresAt < new Date() ||
    access_token.deletedAt !== null
  )
    return NextResponse.json({ message: "Session expired" }, { status: 401 });

  const user = await getUserSettingByUserId(access_token.tokenableId);

  const userData: UserSettings = {
    id: user.id,
    role: user.role,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    fullName: user.fullName,
    theme: user.theme,
  };

  return NextResponse.json({ user: userData }, { status: 200 });
}
