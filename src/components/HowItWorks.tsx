"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { GitFork, FileText, GitPullRequest } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Fork & Clone",
    description:
      "Fork the bnb-chain/skills-hub repository on GitHub and clone it locally. The whole process takes about two minutes.",
    icon: <GitFork size={24} className="text-bnb-yellow" />,
    gradient: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    number: "02",
    title: "Add Your Metadata File",
    description:
      "Create a single JSON file named <skillname>-metadata.json inside the skills/ folder. Fill in the required fields: github_url (public repo), category (array of tags), and a one-to-two sentence description.",
    icon: <FileText size={24} className="text-bnb-yellow" />,
    gradient: "from-yellow-500/20 to-orange-600/10",
  },
  {
    number: "03",
    title: "Open a PR",
    description:
      "Submit a pull request against the main branch — one skill per PR. Once merged, the system automatically enriches your entry with owner info, repo stats, and an AgentGuard security scan.",
    icon: <GitPullRequest size={24} className="text-bnb-yellow" />,
    gradient: "from-yellow-500/20 to-amber-600/10",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(240,185,11,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bnb-yellow/10 border border-bnb-yellow/20 text-bnb-yellow text-xs font-semibold tracking-wider uppercase mb-4">
            🛠 Contribute
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-bnb-text">
            Add Your Skill in 3 Steps
          </h2>
          <p className="mt-3 text-bnb-muted text-lg max-w-2xl mx-auto">
            Contributing is simple. Share your AI agent skill with the BNB Chain
            community and help builders move faster.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-bnb-yellow/30 via-bnb-yellow/10 to-bnb-yellow/30 z-0" />

          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
              }}
            >
              {/* Step card */}
              <div className="relative group flex flex-col h-full rounded-2xl border border-bnb-border bg-bnb-card hover:border-bnb-yellow/30 transition-all duration-300 p-8 overflow-hidden">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Step number + Icon */}
                <div className="relative flex items-center justify-between mb-6">
                  <span
                    className="text-6xl font-black leading-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(240,185,11,0.5) 0%, rgba(240,185,11,0.1) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-bnb-yellow/10 border border-bnb-yellow/20 flex items-center justify-center z-10">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-bnb-text mb-3">
                    {step.title}
                  </h3>
                  <p className="text-bnb-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/bnb-chain/skills-hub/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-bnb-yellow/40 text-bnb-yellow font-semibold hover:bg-bnb-yellow/10 hover:border-bnb-yellow/70 transition-all duration-200 text-sm"
          >
            View Contribution Guide →
          </a>
        </div>
      </div>
    </section>
  );
}
