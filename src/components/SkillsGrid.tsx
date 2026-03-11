"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import SkillCard from "@/components/SkillCard";
import type { Skill } from "@/lib/skills";

interface SkillsGridProps {
  skills: Skill[];
  categories: string[];
}

export default function SkillsGrid({ skills, categories }: SkillsGridProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = useMemo(() => {
    const q = search.toLowerCase().trim();
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === "All" || skill.category === activeCategory;
      const matchesSearch =
        !q ||
        skill.title.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.category.toLowerCase().includes(q) ||
        skill.author.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [skills, search, activeCategory]);

  const allCategories = ["All", ...categories];

  return (
    <div>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bnb-muted pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search skills by name, category, or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bnb-card border border-bnb-border text-bnb-text placeholder:text-bnb-muted text-sm focus:outline-none focus:border-bnb-yellow/50 focus:ring-1 focus:ring-bnb-yellow/20 transition-all"
          />
        </div>

        {/* Result count */}
        <div className="flex items-center gap-2 text-bnb-muted text-sm shrink-0">
          <SlidersHorizontal size={14} />
          <span>
            <span className="text-bnb-text font-semibold">{filteredSkills.length}</span>{" "}
            skill{filteredSkills.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeCategory === category
                ? "bg-bnb-yellow text-bnb-dark border-bnb-yellow shadow-lg shadow-bnb-yellow/20"
                : "bg-transparent text-bnb-muted border-bnb-border hover:border-bnb-yellow/40 hover:text-bnb-text"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredSkills.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-bnb-text font-semibold text-lg mb-2">
              No skills found
            </h3>
            <p className="text-bnb-muted text-sm max-w-sm">
              Try a different search term or category filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 px-5 py-2 rounded-lg border border-bnb-border text-bnb-muted text-sm hover:border-bnb-yellow/40 hover:text-bnb-yellow transition-all"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
