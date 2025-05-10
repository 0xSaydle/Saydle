import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { supabaseAdmin } from "@/supabase/supabase_client";

const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const isAuth = !!token;
  const pathname = req.nextUrl.pathname;

  // If not authenticated and trying to access protected routes
  if (!isAuth && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated
  if (isAuth) {
    try {
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("phone_number")
        .eq("email", token.email)
        .single();

      // If user has phone number and tries to access onboarding, redirect to dashboard
      if (user?.phone_number && pathname.startsWith("/dashboard/onboarding")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // If no phone number and trying to access dashboard, redirect to onboarding
      if (
        !user?.phone_number &&
        (pathname === "/dashboard" || pathname === "/dashboard/")
      ) {
        return NextResponse.redirect(
          new URL("/dashboard/onboarding/step/1", req.url)
        );
      }
    } catch (error) {
      console.error("Error checking user phone number:", error);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
};

export default middleware;
