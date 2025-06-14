/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media-exp1.licdn.com',
      'media.licdn.com'
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://accounts.google.com",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 