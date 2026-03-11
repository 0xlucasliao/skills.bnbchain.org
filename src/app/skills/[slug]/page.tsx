import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Github,
  Tag,
  User,
  Star,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSkillBySlug, getAllSlugs } from "@/lib/skills";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  if (slugs.length === 0) return [{ slug: "__placeholder__" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) return { title: "Skill Not Found" };

  const title = `${skill.title} — BNB Chain AI Agent Skill`;
  const description = skill.description;
  const url = `https://bnbchainskills.com/skills/${slug}`;

  return {
    title,
    description,
    keywords: [
      skill.title,
      ...skill.categories,
      "BNB Chain",
      "AI agent skill",
      "MCP",
      "blockchain skill",
      "Web3 automation",
      skill.author,
    ],
    authors: [{ name: skill.author }],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "BNB Chain Skills Hub",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

const RISK_STYLES: Record<string, string> = {
  safe: "bg-green-500/20 text-green-400 border-green-500/30",
  low: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  high: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) notFound();

  const colorClass = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS["Other"];
  const fallbackIcon = CATEGORY_ICONS[skill.category] || "⚡";
  const riskKey = skill.riskLevel?.toLowerCase();
  const riskStyle = riskKey ? RISK_STYLES[riskKey] || RISK_STYLES["safe"] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: skill.title,
    description: skill.description,
    url: `https://bnbchainskills.com/skills/${slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: skill.author,
      url: skill.ownerProfileUrl,
    },
    codeRepository: skill.github,
    keywords: skill.categories.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main className="min-h-screen pt-20 pb-20">
        {/* Hero header */}
        <div className="relative border-b border-bnb-border bg-bnb-card/30 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(240,185,11,0.04) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-bnb-muted mb-8">
              <Link href="/" className="hover:text-bnb-yellow transition-colors">Home</Link>
              <span>/</span>
              <Link href="/skills" className="hover:text-bnb-yellow transition-colors">Skills</Link>
              <span>/</span>
              <span className="text-bnb-text">{skill.title}</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-bnb-dark border border-bnb-border flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                {skill.ownerAvatarUrl ? (
                  <Image
                    src={skill.ownerAvatarUrl}
                    alt={skill.author}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  fallbackIcon
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colorClass} mb-3`}>
                  {skill.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-bnb-text tracking-tight mb-3">
                  {skill.title}
                </h1>
                <p className="text-bnb-muted text-lg leading-relaxed max-w-3xl">
                  {skill.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Main content */}
            <div className="lg:col-span-3 order-2 lg:order-1 space-y-6">

              {/* Security scan — top */}
              {skill.riskLevel && (
                <div className="rounded-2xl border border-bnb-border bg-bnb-card p-6">
                  <h2 className="text-bnb-text font-semibold text-sm uppercase tracking-wider mb-4">
                    Security Scan
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck size={18} className="text-bnb-muted" />
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${riskStyle}`}>
                      {skill.riskLevel.charAt(0).toUpperCase() + skill.riskLevel.slice(1)}
                    </span>
                    {skill.riskScore !== undefined && (
                      <span className="text-bnb-muted text-xs">
                        Risk score: {skill.riskScore}
                      </span>
                    )}
                  </div>
                  {skill.agentguardReportUrl && (
                    <a
                      href={skill.agentguardReportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-bnb-yellow text-sm hover:text-yellow-400 transition-colors"
                    >
                      View full AgentGuard report
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {skill.evaluatedAt && (
                    <p className="text-bnb-muted text-xs mt-2">
                      Evaluated{" "}
                      {new Date(skill.evaluatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              )}

              {/* Tags */}
              {skill.categories.length > 0 && (
                <div className="rounded-2xl border border-bnb-border bg-bnb-card p-6">
                  <h2 className="text-bnb-text font-semibold text-sm uppercase tracking-wider mb-3">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skill.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-bnb-dark border border-bnb-border text-bnb-muted capitalize"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 order-1 lg:order-2">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-bnb-border bg-bnb-card p-6">
                  <h3 className="text-bnb-text font-semibold text-sm uppercase tracking-wider mb-4">
                    Skill Info
                  </h3>

                  <dl className="space-y-4">
                    <div className="flex items-start gap-3">
                      {skill.ownerAvatarUrl ? (
                        <Image
                          src={skill.ownerAvatarUrl}
                          alt={skill.author}
                          width={20}
                          height={20}
                          className="rounded-full mt-0.5 shrink-0"
                        />
                      ) : (
                        <User size={15} className="text-bnb-muted mt-0.5 shrink-0" />
                      )}
                      <div>
                        <dt className="text-bnb-muted text-xs mb-0.5">Author</dt>
                        <dd className="text-bnb-text text-sm font-medium">
                          {skill.ownerProfileUrl ? (
                            <a
                              href={skill.ownerProfileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-bnb-yellow transition-colors"
                            >
                              @{skill.author}
                            </a>
                          ) : (
                            <>@{skill.author}</>
                          )}
                        </dd>
                      </div>
                    </div>

                    {skill.stars !== undefined && (
                      <div className="flex items-start gap-3">
                        <Star size={15} className="text-bnb-muted mt-0.5 shrink-0" />
                        <div>
                          <dt className="text-bnb-muted text-xs mb-0.5">Stars</dt>
                          <dd className="text-bnb-text text-sm font-medium">
                            {skill.stars.toLocaleString()}
                          </dd>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Tag size={15} className="text-bnb-muted mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-bnb-muted text-xs mb-0.5">Category</dt>
                        <dd>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${colorClass}`}>
                            {skill.category}
                          </span>
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {skill.github && (
                  <a
                    href={skill.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-bnb-yellow text-bnb-dark font-semibold text-sm hover:bg-yellow-400 transition-all duration-200"
                  >
                    <Github size={16} />
                    View on GitHub
                  </a>
                )}

                <Link
                  href="/skills"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-bnb-border text-bnb-muted text-sm hover:border-bnb-yellow/40 hover:text-bnb-yellow transition-all"
                >
                  <ArrowLeft size={15} />
                  Back to Skills
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
