/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Esto es el "pase VIP"
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;