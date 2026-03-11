export interface Skill {
  slug: string;
  title: string;
  description: string;
  category: string;
  categories: string[];
  author: string;
  github: string;
  stars?: number;
  ownerAvatarUrl?: string;
  ownerProfileUrl?: string;
  riskLevel?: string;
  riskScore?: number;
  agentguardReportUrl?: string;
  evaluatedAt?: string;
}

const GITHUB_OWNER = "bnb-chain";
const GITHUB_REPO = "skills-hub";
const GITHUB_BRANCH = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const CATEGORY_MAP: Record<string, string> = {
  defi: "DeFi",
  trading: "Trading",
  data: "Data & Analytics",
  analytics: "Data & Analytics",
  infrastructure: "Infrastructure",
  blockchain: "Infrastructure",
  ai: "AI Agents",
  "ai agents": "AI Agents",
  agents: "AI Agents",
  nft: "NFT & Tokens",
  tokens: "NFT & Tokens",
  "cross-chain": "Cross-Chain",
  bridge: "Cross-Chain",
  security: "Security",
};

function normalizeCategory(rawCategories: string[]): string {
  for (const cat of rawCategories) {
    const normalized = CATEGORY_MAP[cat.toLowerCase()];
    if (normalized) return normalized;
  }
  return "Other";
}

interface SkillMetadata {
  name?: string;
  github_url?: string;
  category?: string[];
  description?: string;
  owner?: {
    username?: string;
    display_name?: string;
    profile_url?: string;
    avatar_url?: string;
  };
  repo?: {
    stars?: number;
    default_branch?: string;
  };
  agentguard_report_url?: string;
  agentguard_result?: {
    risk_score?: number;
    risk_level?: string;
    verdict?: string;
    summary?: string;
  };
  evaluated_at?: string;
}

function parseSkillJson(json: SkillMetadata, slug: string): Skill {
  const categories = json.category || [];
  return {
    slug,
    title: json.name || slug,
    description: json.description || "",
    category: normalizeCategory(categories),
    categories,
    author: json.owner?.display_name || json.owner?.username || "unknown",
    github: json.github_url || "",
    stars: json.repo?.stars,
    ownerAvatarUrl: json.owner?.avatar_url,
    ownerProfileUrl: json.owner?.profile_url,
    riskLevel: json.agentguard_result?.risk_level,
    riskScore: json.agentguard_result?.risk_score,
    agentguardReportUrl: json.agentguard_report_url,
    evaluatedAt: json.evaluated_at,
  };
}

interface GithubContentItem {
  name: string;
  type: string;
}

function isSkillFile(item: GithubContentItem): boolean {
  return (
    item.type === "file" &&
    item.name.endsWith("-metadata.json") &&
    item.name !== "_TEMPLATE-metadata.json"
  );
}

export async function getAllSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_BASE}/contents/skills`, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const items: GithubContentItem[] = await res.json();
  const metadataFiles = items.filter(isSkillFile);

  const skills = await Promise.all(
    metadataFiles.map(async (file) => {
      const slug = file.name.replace(/-metadata\.json$/, "");
      const jsonRes = await fetch(`${RAW_BASE}/skills/${file.name}`, {
        next: { revalidate: 3600 },
      });
      if (!jsonRes.ok) return null;

      const json: SkillMetadata = await jsonRes.json();
      return parseSkillJson(json, slug);
    })
  );

  return (skills.filter(Boolean) as Skill[]).sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const res = await fetch(`${RAW_BASE}/skills/${slug}-metadata.json`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const json: SkillMetadata = await res.json();
  return parseSkillJson(json, slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/contents/skills`, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const items: GithubContentItem[] = await res.json();
  return items
    .filter(isSkillFile)
    .map((item) => item.name.replace(/-metadata\.json$/, ""));
}
