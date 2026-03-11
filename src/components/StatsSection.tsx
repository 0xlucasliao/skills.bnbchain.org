"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Layers, Code2 } from "lucide-react";

interface StatItem {
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    value: "8+",
    numericValue: 8,
    suffix: "+",
    label: "Skills Available",
    sublabel: "Ready to use in your AI agent",
    icon: <Zap className="text-bnb-yellow" size={22} />,
  },
  {
    value: "6",
    numericValue: 6,
    label: "Categories",
    sublabel: "DeFi, Trading, Analytics & more",
    icon: <Layers className="text-bnb-yellow" size={22} />,
  },
  {
    value: "Open Source",
    label: "Always Free",
    sublabel: "MIT licensed, forever open",
    icon: <Code2 className="text-bnb-yellow" size={22} />,
  },
];

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 border-y border-bnb-border overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(240,185,11,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="relative flex flex-col items-center text-center px-8 py-8 rounded-2xl border border-bnb-border bg-bnb-card/40 backdrop-blur-sm group hover:border-bnb-yellow/30 transition-all duration-300"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
              }}
            >
              {/* Icon */}
              <div className="mb-4 w-12 h-12 rounded-xl bg-bnb-yellow/10 border border-bnb-yellow/20 flex items-center justify-center group-hover:bg-bnb-yellow/15 transition-colors">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-4xl sm:text-5xl font-extrabold text-bnb-text mb-1 tracking-tight">
                {stat.numericValue !== undefined ? (
                  <AnimatedNumber
                    target={stat.numericValue}
                    suffix={stat.suffix}
                  />
                ) : (
                  <span className="text-bnb-yellow text-3xl sm:text-4xl">{stat.value}</span>
                )}
              </div>

              {/* Label */}
              <div className="text-bnb-text font-semibold text-lg mb-1">
                {stat.label}
              </div>

              {/* Sublabel */}
              <div className="text-bnb-muted text-sm">{stat.sublabel}</div>

              {/* Separator (not on last) */}
              {index < STATS.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-bnb-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
