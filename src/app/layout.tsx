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
  title: "Elma Digital — Logos, Websites & Custom Software in Elma, WA",
  description:
    "Elma Digital serves Grays Harbor businesses with logo design, flyer design, website design, and custom software. Locally owned in Elma, WA. Call (360) 843-5566.",
  openGraph: {
    title: "Elma Digital — Logos, Websites & Custom Software in Elma, WA",
    description:
      "Logo design from $50. Websites from $750. Custom software for local businesses. Serving Grays Harbor County, WA.",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Elma Digital",
  description:
    "Logo design, flyer design, website design, and custom software for local businesses in Grays Harbor County, Washington.",
  url: "https://elmadigital.io",
  telephone: "+13608435566",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Elma",
    addressRegion: "WA",
    postalCode: "98541",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.9975,
    longitude: -123.4091,
  },
  areaServed: [
    "Elma", "Aberdeen", "Hoquiam", "Montesano", "McCleary",
    "Ocean Shores", "Westport", "Cosmopolis", "Grays Harbor County",
  ],
  priceRange: "$–$$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logo Design" }, price: "50", priceCurrency: "USD" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flyer & Print Design" }, price: "25", priceCurrency: "USD" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Single-Page Website" }, price: "750", priceCurrency: "USD" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Page Website" }, price: "1500", priceCurrency: "USD" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
    ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
