import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { Providers } from "@/components/providers/session-provider";
import "@/lib/queue/startup"; // Initialize background workers

const themeScript = `
  (function() {
    const theme = localStorage.getItem('scentsmith-ui-theme') || 'light';
    document.documentElement.classList.add(theme);
  })();
`;

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "ScentSmith - Perfume Analysis Platform",
    description: "AI-powered perfume analysis and fragrance discovery platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className={`${geistMono.className} antialiased`}>
                <Providers>
                    <AuthenticatedLayout>{children}</AuthenticatedLayout>
                </Providers>
            </body>
        </html>
    );
}
