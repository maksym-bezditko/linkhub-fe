/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'linkhub-s3-b.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
  },
};

module.exports = nextConfig;
