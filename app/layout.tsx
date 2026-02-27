import type { Metadata } from "next";
import { Inter, Sora, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eveagle Studio | Creative Digital Agency",
  description: "Eveagle is a creative studio for brand systems, digital experiences, and campaigns—crafted with clarity and built to perform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${ibmPlexMono.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
