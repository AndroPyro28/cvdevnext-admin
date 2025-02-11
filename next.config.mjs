/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.cvconnect.app',
          pathname: '/**',
        },
      ],
    },
    reactStrictMode: true, // Enable strict mode for React
  };
  
  export default nextConfig;