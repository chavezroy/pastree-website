import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://pastr.ee'),
  title: "Pastree - Clipboard Manager for Chrome & Firefox",
  description: "Pastree is a clipboard manager for Chrome and Firefox that allows you to save and organize your clipboard history.",
  keywords: ["clipboard manager", "browser extension", "productivity", "chrome extension", "firefox addon"],
  authors: [{ name: "Pastree Team" }],
  creator: "Pastree",
  publisher: "Pastree",
  robots: "index, follow",
  openGraph: {
    title: "Pastree - Clipboard Manager for Chrome & Firefox",
    description: "Pastree is a clipboard manager for Chrome and Firefox that allows you to save and organize your clipboard history.",
    images: ["/og-pastree.png"],
    type: "website",
    url: "https://pastr.ee/",
    siteName: "Pastree",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pastree - Clipboard Manager for Chrome & Firefox",
    description: "Pastree is a clipboard manager for Chrome and Firefox that allows you to save and organize your clipboard history.",
    images: ["/og-pastree.png"],
    creator: "@pastree",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
