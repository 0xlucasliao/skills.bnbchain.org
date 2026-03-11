"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";

const GITHUB_REPO = "https://github.com/bnb-chain/skills-hub";

function BNBLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        fill="#F0B90B"
        opacity="0.15"
        stroke="#F0B90B"
        strokeWidth="1.5"
      />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fill="#F0B90B"
        fontFamily="Inter, sans-serif"
      >
        BNB
      </text>
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bnb-dark/90 backdrop-blur-xl border-b border-bnb-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <BNBLogo />
            <div className="flex flex-col leading-none">
              <span className="text-bnb-text font-bold text-sm tracking-wide">
                BNB Chain
              </span>
              <span className="text-bnb-yellow font-semibold text-xs">
                Skills Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/skills"
              className="text-bnb-muted hover:text-bnb-text transition-colors text-sm font-medium"
            >
              Skills
            </Link>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-bnb-muted hover:text-bnb-text transition-colors text-sm font-medium"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href={`${GITHUB_REPO}/pulls`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-bnb-yellow text-bnb-dark text-sm font-semibold hover:bg-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-bnb-yellow/20"
            >
              Add a Skill
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-bnb-muted hover:text-bnb-text transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-bnb-border bg-bnb-card/95 backdrop-blur-xl">
            <nav className="flex flex-col gap-1 px-4 py-4">
              <Link
                href="/skills"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-bnb-muted hover:text-bnb-text hover:bg-bnb-card-hover transition-colors text-sm font-medium"
              >
                Skills
              </Link>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-bnb-muted hover:text-bnb-text hover:bg-bnb-card-hover transition-colors text-sm font-medium"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href={`${GITHUB_REPO}/pulls`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-bnb-yellow text-bnb-dark text-sm font-semibold hover:bg-yellow-400 transition-all"
              >
                Add a Skill
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
