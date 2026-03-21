import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        unoptimized: false,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
            {
                protocol: "https",
                hostname: "gravatar.com",
                pathname: "/avatar",
            },
        ],
        localPatterns: [
            {
                pathname: "/assets/**",
            },
        ],
    },
    // ADICIONADO: Camada de segurança de rede
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY", // Protege contra Clickjacking
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff", // Impede o browser de adivinhar tipos de arquivos
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin", // Protege a privacidade da sua URL
                    },
                    {
                        // IMPORTANTE: Permite que o Turnstile da Cloudflare e o Next.js funcionem com segurança
                        key: "Content-Security-Policy",
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; img-src 'self' data: https://image.tmdb.org https://gravatar.com; connect-src 'self' https://challenges.cloudflare.com;",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()", // Bloqueia acesso a hardware desnecessário
                    },
                ],
            },
            {
                source: "/_next/image(.*)", // Caso você decida tirar o unoptimized futuramente
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: `/:locale`,
                destination: `/:locale/start`,
                permanent: false,
            },
        ];
    },
};

//export default nextConfig;
export default withNextIntl(nextConfig);
