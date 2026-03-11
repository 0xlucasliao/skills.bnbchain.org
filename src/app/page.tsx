import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeaturedSkills from "@/components/FeaturedSkills";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { getAllSkills } from "@/lib/skills";

export default async function HomePage() {
  const allSkills = await getAllSkills();

  // Pick 3 interesting featured skills
  const featuredSlugs = ["bnbchain-mcp", "trading-signal", "crypto-market-rank"];
  const featuredSkills = featuredSlugs
    .map((slug) => allSkills.find((s) => s.slug === slug))
    .filter(Boolean)
    .concat(allSkills.filter((s) => !featuredSlugs.includes(s.slug)))
    .slice(0, 3) as typeof allSkills;

  const skillCount = allSkills.length;
  const categoryCount = new Set(allSkills.map((s) => s.category)).size;

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <StatsSection skillCount={skillCount} categoryCount={categoryCount} />
        <FeaturedSkills skills={featuredSkills} />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
