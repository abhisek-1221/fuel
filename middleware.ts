import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/test(.*)", "/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    
    if (!userId) {
      // Redirect to sign-in page
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Check if user is accessing /test and needs onboarding
    if (req.nextUrl.pathname === "/test") {
      try {
        // Check if user exists in database via API call
        const response = await fetch(`${req.nextUrl.origin}/api/user/check`, {
          headers: {
            'user-id': userId,
          },
        });
        
        if (!response.ok || !(await response.json()).exists) {
          // User doesn't exist in DB, redirect to onboarding
          return NextResponse.redirect(new URL("/onboarding", req.url));
        }
      } catch (error) {
        console.error('Middleware user check error:', error);
        // If there's an error checking user, redirect to onboarding for safety
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
  runtime: 'nodejs',
};
