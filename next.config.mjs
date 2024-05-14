/** @type {import('next').NextConfig} */
import path from 'path'

const nextConfig = {
  sassOptions: {
    includePaths: [path.join('@/styles', 'styles')],
  },
}

export default nextConfig
