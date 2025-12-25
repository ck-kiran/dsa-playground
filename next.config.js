const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'dsaPlayground',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './DsaPlayground': './src/components/DsaPlaygroundExport.tsx',
          './DsaPlaygroundPage': './src/features/dsa/pages/DsaPlaygroundPage.tsx',
          './TopicCard': './src/features/dsa/components/topic-card/TopicCard.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
          'next': {
            singleton: true,
            requiredVersion: '^16.0.0',
          },
        },
      })
    );
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig