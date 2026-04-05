import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); 
  const { pathname } = req.nextUrl;

  // Protected pages
  const protectedPaths = ["/cart", "/checkout", "/profile"];
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/checkout", "/profile/:path*"]
};