/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nhaxinh.com', 'ibb.co'],
  },
  
}

module.exports = nextConfig
