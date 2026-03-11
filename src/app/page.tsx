import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeaturedSkills from "@/components/FeaturedSkills";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { getAllSkills } from "@/lib/skills";

export const metadata: Metadata = {
  alternates: { canonical: "https://bnbchainskills.com" },
};

export default async function HomePage() {
  const allSkills = await getAllSkills();

  const featuredSlugs = ["bnbchain-mcp", "trading-signal", "crypto-market-rank"];
  const featuredSkills = featuredSlugs
    .map((slug) => allSkills.find((s) => s.slug === slug))
    .filter(Boolean)
    .concat(allSkills.filter((s) => !featuredSlugs.includes(s.slug)))
    .slice(0, 3) as typeof allSkills;

  const skillCount = allSkills.length;
  const categoryCount = new Set(allSkills.map((s) => s.category)).size;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bnbchainskills.com/#website",
        url: "https://bnbchainskills.com",
        name: "BNB Chain Skills Hub",
        description:
          "Community-driven registry of AI agent skills for BNB Chain. Discover, use, and contribute open-source skills for DeFi, trading, analytics, and blockchain automation.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://bnbchainskills.com/skills?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": "https://bnbchainskills.com/#collection",
        url: "https://bnbchainskills.com",
        name: "BNB Chain AI Agent Skills Registry",
        description: `Browse ${skillCount} open-source AI agent skills across ${categoryCount} categories for BNB Chain development.`,
        numberOfItems: skillCount,
        hasPart: featuredSkills.map((s) => ({
          "@type": "SoftwareApplication",
          name: s.title,
          description: s.description,
          url: `https://bnbchainskills.com/skills/${s.slug}`,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        <Hero skillCount={skillCount} categoryCount={categoryCount} />
        <StatsSection skillCount={skillCount} categoryCount={categoryCount} />
        <FeaturedSkills skills={featuredSkills} />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
