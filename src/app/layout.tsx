import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BaseLayoutWithDecoration from "@/components/BaseLayout/BaseLayoutWithDecoration";

const inter = Inter({ subsets: ["latin"] });

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  title: "Zhavoronskaya",
  description: "3D Artist Portfolio",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Zhavoronskaya",
    description: "3D Artist Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zhavoronskaya - 3D Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhavoronskaya",
    description: "3D Artist Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <BaseLayoutWithDecoration>{children}</BaseLayoutWithDecoration>
      </body>
    </html>
  );
}
