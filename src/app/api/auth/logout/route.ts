import { generateCryptoHash } from "@/libs/utils";
import { deleteAccessTokenByHashToken } from "@/repository/access_token";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_session")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const tokenHash = await generateCryptoHash(token);

    const deleteAccessTokenData = await deleteAccessTokenByHashToken(tokenHash);

    if (!deleteAccessTokenData) {
      throw new ApiError(401, "Data not found!");
    }

    const res = NextResponse.json({ message: "Logout successful" });

    // clear the cookie
    res.cookies.set("auth_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: error?.status ? error?.status : error?.statusCode || 500 },
    );
  }
}
