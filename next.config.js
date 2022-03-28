module.exports = {
  reactStrictMode: true,
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://terzett-proyectos.vercel.app/:path*',
      },
    ]
  },

}
