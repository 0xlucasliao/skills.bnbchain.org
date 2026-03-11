import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BNB Chain Skills Hub",
    template: "%s | BNB Chain Skills Hub",
  },
  description:
    "The open skills marketplace for BNB Chain AI agents. Discover, use, and contribute skills for DeFi, trading, analytics, and more.",
  keywords: [
    "BNB Chain",
    "BSC",
    "AI agents",
    "skills",
    "DeFi",
    "blockchain",
    "MCP",
    "trading",
    "Web3",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bnbchainskills.com",
    title: "BNB Chain Skills Hub",
    description:
      "The open skills marketplace for BNB Chain AI agents. Discover, use, and contribute skills for DeFi, trading, analytics, and more.",
    siteName: "BNB Chain Skills Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "BNB Chain Skills Hub",
    description:
      "The open skills marketplace for BNB Chain AI agents.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⬡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bnb-dark text-bnb-text antialiased">
        {children}
      </body>
    </html>
  );
}
