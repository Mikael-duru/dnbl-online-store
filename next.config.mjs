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
        hostname: 'lh3.googleusercontent.com',  // Google user profile images
      },
      {
        hostname: 'res.cloudinary.com',  // Cloudinary images
      },
      {
        hostname: 'graph.facebook.com',  // Facebook profile images
      },
    ],
  },
};

export default nextConfig;
