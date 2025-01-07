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
                destination: `/:locale/popular`,
                permanent: false,
            },
        ]
    }
};

//export default nextConfig;
export default withNextIntl(nextConfig);