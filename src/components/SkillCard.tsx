"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { Skill } from "@/lib/skills";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/categories";

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const colorClass =
    CATEGORY_COLORS[skill.category] || CATEGORY_COLORS["Other"];
  const fallbackIcon = CATEGORY_ICONS[skill.category] || "⚡";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="h-full"
      style={{ willChange: "transform" }}
    >
      <Link href={`/skills/${skill.slug}`} className="block h-full">
        <div className="group relative h-full flex flex-col rounded-2xl border border-bnb-border bg-bnb-card hover:border-bnb-yellow/40 hover:bg-bnb-card-hover transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(240,185,11,0.1)]">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bnb-yellow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="p-6 flex flex-col flex-1">
            {/* Header: Icon + Category */}
            <div className="flex items-start justify-between mb-4">
              {/* Owner avatar or category emoji */}
              <div className="relative">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-bnb-dark border border-bnb-border group-hover:border-bnb-yellow/30 transition-colors overflow-hidden text-2xl">
                  {skill.ownerAvatarUrl ? (
                    <Image
                      src={skill.ownerAvatarUrl}
                      alt={skill.author}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    fallbackIcon
                  )}
                </div>
              </div>

              {/* Category badge */}
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClass}`}
              >
                {skill.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-bnb-text font-semibold text-lg leading-snug mb-2 group-hover:text-white transition-colors">
              {skill.title}
            </h3>

            {/* Description */}
            <p className="text-bnb-muted text-sm leading-relaxed line-clamp-3 flex-1">
              {skill.description}
            </p>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-bnb-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Author */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-bnb-dark/60 border border-bnb-border/60 text-bnb-muted text-xs">
                  <span className="text-bnb-yellow">@</span>
                  {skill.author}
                </span>

                {/* Stars */}
                {skill.stars !== undefined && (
                  <span className="inline-flex items-center gap-1 text-xs text-bnb-muted">
                    <Star size={11} className="text-bnb-yellow" />
                    {skill.stars}
                  </span>
                )}
              </div>

              {/* Arrow */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-bnb-muted group-hover:text-bnb-yellow group-hover:bg-bnb-yellow/10 transition-all duration-200">
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
