import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SkillsGrid from "@/components/SkillsGrid";
import { getAllSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Skills Directory",
  description:
    "Browse all AI agent skills for BNB Chain development. Filter by category and search for DeFi, trading, analytics, and infrastructure skills.",
};

export default async function SkillsPage() {
  const skills = await getAllSkills();
  const categories = Array.from(new Set(skills.map((s) => s.category))).sort();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bnb-yellow/10 border border-bnb-yellow/20 text-bnb-yellow text-xs font-semibold tracking-wider uppercase mb-4">
              Skills Directory
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-bnb-text tracking-tight">
              Browse All Skills
            </h1>
            <p className="mt-3 text-bnb-muted text-lg max-w-2xl">
              Discover community-built AI agent skills for BNB Chain. Each skill
              is open source and ready to integrate with your AI workflow.
            </p>
          </div>

          {/* Skills grid with search/filter */}
          <SkillsGrid skills={skills} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
