/** @type {import('next').NextConfig} */

const nextConfig: import("next").NextConfig = {
  /* config options here */
  // env: {
  //   SUPABASE_URL: process.env.SUPABASE_URL as string,
  //   SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  //   SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY as string,
  // },

  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
