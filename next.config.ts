import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            },
            {
                protocol: 'https',
                hostname: 'gravatar.com',
                pathname: '/avatar'
            }
        ],
        localPatterns: [
            {
                pathname: '/assets/**',
            }
        ]
    },
    async redirects() {
        return [
            {
                source: `/:locale`,
                destination: `/:locale/start`,
                permanent: false,
            },
        ]
    }
};

//export default nextConfig;
export default withNextIntl(nextConfig);