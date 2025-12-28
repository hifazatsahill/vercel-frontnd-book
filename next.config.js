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
      'cdn-icons-png.flaticon.com',
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace('https://', '')?.replace('http://', '') || 'localhost'
    ].filter(domain => domain && domain !== ''), // Remove empty domains
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    // Use the deployed backend URL or fallback to localhost for development
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-backend-deployment-name.vercel.app';
    return [
      {
        source: '/api/:path*',
        destination: apiUrl + '/:path*',
      },
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['axios'],
  },
}

module.exports = nextConfig