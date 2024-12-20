/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'zigbeeoutr.in',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'zigbee-testing.netlify.app',
        pathname: '**',
      },
    ]
  },
};

export default nextConfig;
