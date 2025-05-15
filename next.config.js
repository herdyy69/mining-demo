/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  redirects() {
    return [
      {
        source: '/',
        destination: '/calculation',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
