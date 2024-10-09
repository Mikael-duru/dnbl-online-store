/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn-icons-png.flaticon.com', 'graph.facebook.com'], // Allows Google user profile images
  },
};

export default nextConfig;
