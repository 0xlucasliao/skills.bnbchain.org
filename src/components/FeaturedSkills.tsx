import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SkillCard from "@/components/SkillCard";
import type { Skill } from "@/lib/skills";

interface FeaturedSkillsProps {
  skills: Skill[];
}

export default function FeaturedSkills({ skills }: FeaturedSkillsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bnb-yellow/10 border border-bnb-yellow/20 text-bnb-yellow text-xs font-semibold tracking-wider uppercase mb-4">
              ⭐ Featured
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-bnb-text">
              Popular Skills
            </h2>
            <p className="mt-2 text-bnb-muted text-lg">
              The most-used skills in the BNB Chain ecosystem
            </p>
          </div>
          <Link
            href="/skills"
            className="group inline-flex items-center gap-2 text-bnb-yellow font-semibold hover:text-yellow-400 transition-colors text-sm whitespace-nowrap"
          >
            View All Skills
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.slice(0, 3).map((skill, index) => (
            <SkillCard key={skill.slug} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
