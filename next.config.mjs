// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode:false,
//   images: {
//     domains: ['lh3.googleusercontent.com', 'graph.facebook.com'], // Allows Google user profile images
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',  // Google user profile images
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'graph.facebook.com',  // Facebook profile images
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
