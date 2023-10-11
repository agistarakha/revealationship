/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/img/**",
      },
      {
        protocol: "https",
        hostname: "revealationship.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "revealationship.vercel.app",
        port: "",
        pathname: "/api/img/**",
      },
    ],
  },
};

module.exports = nextConfig;
