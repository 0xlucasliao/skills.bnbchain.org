import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

const GITHUB_REPO = "https://github.com/bnb-chain/skills-hub";

function BNBLogoText() {
  return (
    <div className="flex items-center gap-2.5">
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
      <div className="flex flex-col leading-none">
        <span className="text-bnb-text font-bold text-sm tracking-wide">
          BNB Chain
        </span>
        <span className="text-bnb-yellow font-semibold text-xs">
          Skills Hub
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-bnb-border bg-bnb-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <BNBLogoText />
            <p className="mt-4 text-bnb-muted text-sm leading-relaxed max-w-xs">
              The open skills marketplace for BNB Chain AI agents. Community
              driven, open source, and always free.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bnb-card border border-bnb-border flex items-center justify-center text-bnb-muted hover:text-bnb-yellow hover:border-bnb-yellow/40 transition-all"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.bnbchain.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bnb-card border border-bnb-border flex items-center justify-center text-bnb-muted hover:text-bnb-yellow hover:border-bnb-yellow/40 transition-all"
                aria-label="BNB Chain website"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-bnb-text font-semibold text-sm mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/skills"
                  className="text-bnb-muted text-sm hover:text-bnb-yellow transition-colors"
                >
                  Browse Skills
                </Link>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO}/pulls`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bnb-muted text-sm hover:text-bnb-yellow transition-colors"
                >
                  Add a Skill
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bnb-muted text-sm hover:text-bnb-yellow transition-colors"
                >
                  GitHub Repo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-bnb-text font-semibold text-sm mb-4">
              BNB Chain
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.bnbchain.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bnb-muted text-sm hover:text-bnb-yellow transition-colors"
                >
                  Official Website
                </a>
              </li>
              <li>
                <a
                  href="https://docs.bnbchain.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bnb-muted text-sm hover:text-bnb-yellow transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bnb-chain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bnb-muted text-sm hover:text-bnb-yellow transition-colors"
                >
                  GitHub Organization
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-bnb-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-bnb-muted text-xs">
            © {currentYear} BNB Chain Skills Hub. MIT License.
          </p>
          <p className="text-bnb-muted text-xs">
            Built for the{" "}
            <a
              href="https://www.bnbchain.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bnb-yellow hover:underline"
            >
              BNB Chain
            </a>{" "}
            ecosystem
          </p>
        </div>
      </div>
    </footer>
  );
}
