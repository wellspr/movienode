import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */
    images: {
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
    }
};

//export default nextConfig;
export default withNextIntl(nextConfig);
