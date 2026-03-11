import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bnbchainskills.com"),
  title: {
    default: "BNB Chain Skills Hub — AI Agent Skills Registry",
    template: "%s | BNB Chain Skills Hub",
  },
  description:
    "Community-driven registry of open-source AI agent skills for BNB Chain. Discover, use, and contribute MCP skills for DeFi, trading, analytics, cross-chain, and blockchain automation.",
  keywords: [
    "BNB Chain skills",
    "BSC AI agents",
    "MCP skills registry",
    "blockchain AI skills",
    "DeFi automation",
    "Web3 AI agents",
    "BNB Chain MCP",
    "open source blockchain skills",
    "AI agent tools",
    "BNB Smart Chain developer",
  ],
  authors: [{ name: "0xlucasliao", url: "https://github.com/0xlucasliao" }],
  creator: "0xlucasliao",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bnbchainskills.com",
    title: "BNB Chain Skills Hub — AI Agent Skills Registry",
    description:
      "Community-driven registry of open-source AI agent skills for BNB Chain. Discover and contribute MCP skills for DeFi, trading, and blockchain automation.",
    siteName: "BNB Chain Skills Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "BNB Chain Skills Hub — AI Agent Skills Registry",
    description:
      "Discover open-source AI agent skills for BNB Chain. DeFi, trading, analytics, and more.",
    creator: "@0xlucasliao",
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
