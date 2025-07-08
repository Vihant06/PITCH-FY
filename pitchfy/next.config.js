/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'banner2.cleanpng.com',
      },
      // add other remotePatterns as needed
    ],
  },
  // ...other config options
};

module.exports = nextConfig; 