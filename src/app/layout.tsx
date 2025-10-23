import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pastree - Clipboard Manager",
  description: "Pastree is a clipboard manager for Chrome and Firefox.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
