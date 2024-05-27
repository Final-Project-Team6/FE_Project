/** @type {import('next').NextConfig} */
import path from 'path'

const nextConfig = {
  sassOptions: {
    includePaths: [path.join('@/styles', 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aptnercl.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
