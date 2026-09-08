import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const isAuth = !!token;
  const pathname = request.nextUrl.pathname;

  // If not authenticated and trying to access protected routes
  if (!isAuth && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated
  if (isAuth) {
    console.log(token);
    try {
      // Get user from Supabase using the token
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("phone_number, subscribed")
        .eq("email  ", token.email)
        .single();
      console.log("User: ", user);

      // If user has completed verification and tries to access onboarding steps 1-4, redirect to dashboard
      // But allow access to step 5 (plan selection) even after completing the basic onboarding
      if (user?.subscribed && pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (
        !user?.subscribed &&
        user?.phone_number &&
        pathname.startsWith("/onboarding") &&
        !pathname.includes("/step/5") &&
        !pathname.includes("/step/6")
      ) {
        return NextResponse.redirect(new URL("/onboarding/step/5", request.url));
      }

      // If not subscribed but completed onboarding and trying to access dashboard, redirect to step 5 so they can subscribe

      if (
        !user?.subscribed &&
        user?.phone_number &&
        (pathname === "/dashboard" || pathname === "/dashboard/")
      ) {
        console.log("Redirecting to step 5");
        return NextResponse.redirect(
          new URL("/onboarding/step/5", request.url)
        );
      }
      // If not verified and trying to access dashboard, redirect to onboarding
      if (
        !user?.subscribed &&
        !user?.phone_number &&
        (pathname === "/dashboard" || pathname === "/dashboard/")
      ) {
        console.log(
          "Redirecting to step 1 because user is not subscribed and has no phone number"
        );
        return NextResponse.redirect(
          new URL("/onboarding/step/1", request.url)
        );
      }
    } catch (error) {
      console.error("Error in middleware:", error);
    }
  }
  // Lemon Squeezy integration
  if (request.nextUrl.pathname.startsWith("/api/webhooks/lemonsqueezy")) {
    // Verify content-type is application/json
    const contentType = request.headers.get("content-type");
    if (contentType !== "application/json") {
      return new NextResponse("Invalid content type", { status: 400 });
    }

    // We'll do the actual signature verification in the route handler
    // since we need access to the raw body
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/step/:path*"],
};
