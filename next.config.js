/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'me.louisvuitton.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'k.nooncdn.com',
        pathname: '**',
      }
    ]
  }
}
