import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Redirect root to /ar (Arabic is the default language)
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/ar", req.nextUrl.origin));
  }

  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/settings",
    "/billing",
    "/discovery",
    "/strategy",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for NextAuth session token (JWT strategy)
    const token =
      req.cookies.get("__Secure-next-auth.session-token")?.value ||
      req.cookies.get("next-auth.session-token")?.value;

    if (!token) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public directory)
     * - sitemap.xml (sitemap)
     * - robots.txt (robots file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|sitemap.xml|robots.txt).*)",
  ],
};
