import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateCryptoHash } from "./libs/utils";
import { findHashTokenByToken } from "./repository/access_token";

export async function proxy(req: NextRequest) {
  // 1Get the session token from HTTP-only cookie
  const { pathname } = req.nextUrl;
  const token = req.cookies.has("auth_session");

  if (
    pathname.startsWith("/settings") ||
    pathname.startsWith("/favorites") ||
    pathname.startsWith("/recipe") ||
    pathname.startsWith("/home")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if (
    (token && pathname.startsWith("/login")) ||
    (token && pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Allow the request to proceed to the next handler
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/api/user/:path*",
    "/settings/:path*",
    "/home/:path*",
    "/favorites/:path*",
    "/recipe/:path*",
    "/login",
    "/signup",
    "/auth/logout/:path*",
    "/api/me/:path*",
  ],
};
