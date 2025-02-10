/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig =
{
    /* config options here */


  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  };

export default nextConfig;
