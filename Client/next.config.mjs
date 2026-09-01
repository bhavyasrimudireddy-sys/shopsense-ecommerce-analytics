/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "codewithsadee.github.io" },
      { protocol: "https", hostname: "cdn.shoplightspeed.com" },
    ],
  },
  output: 'standalone'
};
export default nextConfig;
