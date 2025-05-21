import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { supabaseAdmin } from "@/supabase/supabase_client";

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
    try {
      // Get user from Supabase using the token
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("phone, verified")
        .eq("id", token.sub)
        .single();

      // If user has completed verification and tries to access onboarding steps 1-4, redirect to dashboard
      // But allow access to step 5 (plan selection) even after completing the basic onboarding
      if (
        user?.verified &&
        pathname.startsWith("/onboarding") &&
        !pathname.includes("/step/5") &&
        !pathname.includes("/step/6")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // If not verified and trying to access dashboard, redirect to onboarding
      // if (
      //   !user?.verified &&
      //   (pathname === "/dashboard" || pathname === "/dashboard/")
      // ) {
      //   return NextResponse.redirect(
      //     new URL("/onboarding/step/1", request.url)
      //   );
      // }

      // Handle onboarding step validation
      // if (pathname.startsWith("/dashboard/onboarding/step/")) {
      //   const stepMatch = pathname.match(/\/step\/(\d+)/);
      //   if (stepMatch) {
      //     const requestedStep = parseInt(stepMatch[1]);

      //     // If trying to access step 4 or beyond, allow it
      //     if (requestedStep >= 4) {
      //       return NextResponse.next();
      //     }

      //     // Get onboarding data from cookie
      //     const onboardingData = request.cookies.get("onboardingData")?.value;
      //     let data;
      //     try {
      //       data = onboardingData ? JSON.parse(onboardingData) : {};
      //     } catch {
      //       data = {};
      //     }

      //     // Check which step they should be on
      //     let currentStep = 1;
      //     if (data.name) currentStep = 2;
      //     if (data.phone) currentStep = 3;

      //     // If trying to access a step beyond their progress, redirect to current step
      //     if (requestedStep > currentStep) {
      //       return NextResponse.redirect(
      //         new URL(`/dashboard/onboarding/step/${currentStep}`, request.url)
      //       );
      //     }
      //   }
      // }
    } catch (error) {
      console.error("Error in middleware:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/step/:path*"],
};
