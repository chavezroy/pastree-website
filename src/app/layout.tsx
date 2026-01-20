import type { Metadata } from "next";
import "../styles/globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.AWS_BRANCH && process.env.AWS_APP_ID ? `https://${process.env.AWS_BRANCH}.${process.env.AWS_APP_ID}.amplifyapp.com` : 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'));

export const metadata: Metadata = {
  title: 'Pastree - Clipboard Manager for Chrome & Firefox',
  description: 'Pastree is a clipboard manager for Chrome and Firefox that allows you to save and organize your clipboard history.',
  // Icons are handled automatically by Next.js via app/icon.png
  openGraph: {
    title: 'Pastree - Clipboard Manager for Chrome & Firefox',
    description: 'Pastree is a clipboard manager for Chrome and Firefox that allows you to save and organize your clipboard history.',
    url: siteUrl,
    siteName: 'Pastree - Clipboard Manager for Chrome & Firefox',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Pastree - Clipboard Manager for Chrome & Firefox',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pastree - Clipboard Manager for Chrome & Firefox',
    description: 'Pastree is a clipboard manager for Chrome and Firefox that allows you to save and organize your clipboard history.',
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased overflow-x-hidden">
        <ConditionalHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
