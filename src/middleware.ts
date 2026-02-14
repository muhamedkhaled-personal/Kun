import { auth } from "@/lib/auth/auth";

export const middleware = auth(async (req) => {
  // Redirect root to /en
  if (req.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/en", req.nextUrl.origin));
  }

  const isLoggedIn = !!req.auth;
  const isProtectedRoute = [
    "/dashboard",
    "/admin",
    "/settings",
    "/billing",
    "/discovery",
    "/strategy",
  ].some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  return undefined;
});

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
