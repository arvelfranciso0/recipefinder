import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateCryptoHash } from "./libs/utils";
import { findHashTokenByToken } from "./repository/access_token";

export async function proxy(req: NextRequest) {
  // 1Get the session token from HTTP-only cookie
  const token = req.cookies.get("session")?.value;

  if (!token) {
    // No token → unauthorized
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Hash the token (matches DB storage)
  const tokenHash = await generateCryptoHash(token);

  // Query the DB for a valid session
  const session = await findHashTokenByToken(tokenHash);

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Check expiration
  if (session.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Session valid → continue request
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/api/user/:path*"],
};
