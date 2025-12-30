import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite dashboard.danz.now to /dashboard
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'dashboard.danz.now',
            },
          ],
          destination: '/dashboard/:path*',
        },
      ],
    }
  },
}

export default nextConfig
