"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

const GITHUB_REPO = "https://github.com/bnb-chain/skills-hub";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 12,
  opacity: Math.random() * 0.4 + 0.1,
  isYellow: Math.random() > 0.6,
  driftVariant: Math.floor(Math.random() * 3) + 1,
}));

const HEX_DECORATIONS = [
  { size: 80, left: "8%", top: "20%", opacity: 0.06, delay: 0 },
  { size: 50, left: "92%", top: "15%", opacity: 0.08, delay: 1 },
  { size: 120, left: "85%", top: "65%", opacity: 0.04, delay: 2 },
  { size: 60, left: "3%", top: "70%", opacity: 0.07, delay: 0.5 },
  { size: 40, left: "50%", top: "8%", opacity: 0.05, delay: 1.5 },
];

function HexagonSVG({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ opacity }}
    >
      <polygon
        points="50,3 97,26 97,74 50,97 3,74 3,26"
        fill="none"
        stroke="#F0B90B"
        strokeWidth="2"
      />
    </svg>
  );
}

function BigHexLogo() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow rings */}
      <div className="absolute inset-0 scale-150 opacity-20 animate-pulse">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,6 194,53 194,147 100,194 6,147 6,53"
            fill="none"
            stroke="#F0B90B"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute inset-0 scale-125 opacity-30 animate-pulse" style={{ animationDelay: "0.5s" }}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,6 194,53 194,147 100,194 6,147 6,53"
            fill="none"
            stroke="#F0B90B"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Main hexagon */}
      <svg
        width="140"
        height="140"
        viewBox="0 0 200 200"
        className="drop-shadow-[0_0_30px_rgba(240,185,11,0.5)]"
      >
        <defs>
          <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0B90B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F0B90B" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon
          points="100,8 192,54 192,146 100,192 8,146 8,54"
          fill="url(#hexGrad)"
          stroke="#F0B90B"
          strokeWidth="2.5"
        />
        <text
          x="100"
          y="115"
          textAnchor="middle"
          fontSize="42"
          fontWeight="900"
          fill="#F0B90B"
          fontFamily="Inter, sans-serif"
          letterSpacing="-1"
        >
          BNB
        </text>
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bnb-dark">
      {/* Radial gradient bg */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(240,185,11,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,185,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,185,11,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating hex decorations */}
      {HEX_DECORATIONS.map((hex, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: hex.left,
            top: hex.top,
            animationDelay: `${hex.delay}s`,
            animation: `float ${8 + i}s ease-in-out infinite`,
          }}
        >
          <HexagonSVG size={hex.size} opacity={hex.opacity} />
        </div>
      ))}

      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.isYellow
              ? "rgba(240,185,11,0.6)"
              : "rgba(132,142,156,0.4)",
            animationName: `particle-drift${p.driftVariant === 1 ? "" : `-${p.driftVariant}`}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            willChange: "transform",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        {/* Hex logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <BigHexLogo />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bnb-yellow/10 border border-bnb-yellow/30 text-bnb-yellow text-xs font-semibold tracking-wider uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bnb-yellow animate-pulse" />
          Open Source · Community Driven
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-2">
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #F0B90B 0%, #FFD54F 40%, #F0B90B 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              BNB Chain
            </span>
            <span className="block text-bnb-text">Skills Hub</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-bnb-muted max-w-2xl leading-relaxed"
        >
          The open skills marketplace for BNB Chain AI agents. Discover, use,
          and contribute skills for DeFi, trading, analytics, and more.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            href="/skills"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-bnb-yellow text-bnb-dark font-bold text-base hover:bg-yellow-400 transition-all duration-200 hover:shadow-xl hover:shadow-bnb-yellow/25 hover:-translate-y-0.5"
          >
            Browse Skills
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href={`https://github.com/bnb-chain/skills-hub/pulls`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl border border-bnb-yellow/40 text-bnb-yellow font-bold text-base hover:bg-bnb-yellow/10 hover:border-bnb-yellow/70 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github size={18} />
            Add a Skill
          </a>
        </motion.div>

        {/* Tiny stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 flex items-center gap-6 text-sm text-bnb-muted"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            8+ Skills
          </span>
          <span className="w-px h-4 bg-bnb-border" />
          <span>6 Categories</span>
          <span className="w-px h-4 bg-bnb-border" />
          <span>100% Open Source</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bnb-muted"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-8 bg-gradient-to-b from-bnb-muted/60 to-transparent"
          style={{ animation: "bounce-subtle 2s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}
