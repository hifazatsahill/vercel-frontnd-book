/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'localhost',
      'medical-lab-ai-backend.vercel.app',
      'images.unsplash.com',
      'cdn-icons-png.flaticon.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: apiUrl + '/api/:path*',
      },
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['axios'],
  },
}

module.exports = nextConfig