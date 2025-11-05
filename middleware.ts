import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getSupabaseAdminClient } from "./supabase/supabase_client";

export const supabaseAdmin = getSupabaseAdminClient()

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const isAuth = !!token; // Will be true if a valid session token is found
  const pathname = request.nextUrl.pathname;

  // Define protected API routes and UI routes
  const isProtectedApiRoute = pathname.startsWith("/api/setting/profile");
  const isProtectedUIRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");
  
  // If not authenticated and trying to access protected routes
  if (!isAuth && (isProtectedUIRoute || isProtectedApiRoute)) {
    if (isProtectedApiRoute) {
      console.log("Middleware: Unauthorized access to API route:", pathname);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("Middleware: Unauthorized access to UI route, redirecting to login:", pathname);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated
  if (isAuth) {
    console.log("Middleware: User is authenticated. Token:", token); // Log the token here to see if it's correct
    try {
      // Get user from Supabase using the token
      const { data: user, error: userError } = await supabaseAdmin
        .from("users")
        .select("phone_number, subscribed")
        .eq("email", token.email) // Ensure this is 'email' not 'email  '
        .single();

      if (userError && userError.code !== "PGRST116") { // PGRST116 means "no rows found"
        console.error("Middleware: Error fetching user from Supabase:", userError);
        // Depending on your error handling, you might want to stop the request
        // return NextResponse.json({ message: "Internal server error" }, { status: 500 });
      }

      console.log("Middleware: Supabase User data:", user);
      // If user has completed verification and tries to access onboarding steps 1-4, redirect to dashboard
      // But allow access to step 5 (plan selection) even after completing the basic onboarding
      if (user?.subscribed && pathname.startsWith("/onboarding")) {
        console.log("Middleware: User subscribed, redirecting from onboarding to dashboard.");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (
        !user?.subscribed &&
        user?.phone_number &&
        pathname.startsWith("/onboarding") &&
        !pathname.includes("/step/5") &&
        !pathname.includes("/step/6")
      ) {
        console.log("Middleware: User not subscribed but has phone, redirecting to step 5.");
        return NextResponse.redirect(new URL("/onboarding/step/5", request.url));
      }
      if (
        !user?.subscribed &&
        user?.phone_number &&
        (pathname === "/dashboard" || pathname === "/dashboard/")
      ) {
        console.log("Middleware: User not subscribed but has phone, redirecting dashboard to step 5.");
        return NextResponse.redirect(
          new URL("/onboarding/step/5", request.url)
        );
      }
      if (
        !user?.subscribed &&
        !user?.phone_number &&
        (pathname === "/dashboard" || pathname === "/dashboard/")
      ) {
        console.log("Middleware: User not subscribed and no phone, redirecting dashboard to step 1.");
        return NextResponse.redirect(
          new URL("/onboarding/step/1", request.url)
        );
      }
    } catch (error) {
      console.error("Middleware: Unhandled error in authenticated user logic:", error);
    }
  }

  // Lemon Squeezy integration (no change needed here)
  if (request.nextUrl.pathname.startsWith("/api/webhooks/lemonsqueezy")) {
    const contentType = request.headers.get("content-type");
    if (contentType !== "application/json") {
      return new NextResponse("Invalid content type", { status: 400 });
    }
  }

  console.log("Middleware: Allowing request to proceed:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/step/:path*", "/api/setting/profile", "/api/webhooks/lemonsqueezy"],
};
