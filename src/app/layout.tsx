import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://pastr.ee'),
  title: "Pastree - Clipboard Manager for Chrome & Firefox",
  description: "Pastree is a clipboard manager for Chrome and Firefox that allows you to save and organize your clipboard history.",
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
