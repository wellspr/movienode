//import "@/styles/index.css";
import "@/sass/main.scss";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
    title: "MovieNode",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode,
}>) {

    const locale = await getLocale();

    return (
        <html lang={locale}>
            <body>
                {children}
            </body>
        </html>
    );
}
