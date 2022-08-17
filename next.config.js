/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'image.tmdb.org',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
    ],
  },
  swcMinify: false,
}

module.exports = nextConfig
