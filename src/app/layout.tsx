import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Elma Digital — Custom Software & Web Design in Elma, WA",
  description:
    "Elma Digital helps Grays Harbor business owners get off spreadsheets, show up online, and run their operations with software built around how they actually work.",
  openGraph: {
    title: "Elma Digital — Custom Software & Web Design in Elma, WA",
    description:
      "Custom software, web design, and logo design for local businesses in Grays Harbor County, Washington.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
