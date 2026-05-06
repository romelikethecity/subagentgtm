export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: 'AI for GTM' | 'Claude Code' | 'Outbound' | 'Data' | 'Playbooks' | 'Methodology';
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  excerpt: string;
  hub?: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: 'ai-for-gtm-2026',
    title: 'AI for GTM in 2026: what shipped, what stalled, what to actually build',
    description: 'A practitioner read on AI for GTM in 2026. Where AI SDRs collapsed, where Claude Code teams quietly won, and what to build next.',
    category: 'AI for GTM',
    publishedAt: '2026-05-06',
    readingMinutes: 11,
    hub: true,
    excerpt: "Three years into the AI GTM hype cycle, the receipts are in. AI SDRs collapsed. Generic copilots got ignored. The teams that actually moved pipeline shipped Claude Code subagents in their own repos.",
  },
  {
    slug: 'claude-code-for-gtm',
    title: 'Claude Code for GTM teams: a practitioner\'s guide',
    description: 'How revenue teams use Claude Code subagents to replace AI SDRs, run pipeline hygiene, and ship outbound that gets forwarded. With repo structure and CLAUDE.md examples.',
    category: 'Claude Code',
    publishedAt: '2026-05-06',
    readingMinutes: 14,
    hub: true,
    excerpt: 'The shape of a GTM Claude Code repo: where subagents live, how they read CRM data, how CLAUDE.md gates output. Plus the four most-shipped subagents in 2026.',
  },
  {
    slug: 'why-ai-sdrs-are-failing',
    title: 'Why every AI SDR pilot is dying (and what\'s replacing them)',
    description: '11x lost most of its early customers. Artisan got LinkedIn-banned. The category is collapsing. Here\'s what the failure mode actually was, and what works instead.',
    category: 'Outbound',
    publishedAt: '2026-05-06',
    readingMinutes: 12,
    hub: true,
    excerpt: 'AI SDR vendors trained on the seller\'s value prop. Recipients pattern-matched it as spam. The category never had a methodology problem hiding inside its tool problem.',
  },
  {
    slug: 'claude-md-for-revenue-teams',
    title: 'How to write a CLAUDE.md for your revenue team',
    description: 'A working CLAUDE.md template for GTM teams using Claude Code. Where to keep ICP definitions, voice rules, signal scoring, and the data sources your subagents are allowed to touch.',
    category: 'Claude Code',
    publishedAt: '2026-05-06',
    readingMinutes: 10,
    excerpt: 'A working template for a revenue-team CLAUDE.md. ICP block, voice rules, banned phrases, signal scoring rubric, and the data the subagents are allowed to touch.',
  },
  {
    slug: 'forward-rate-outbound-metric',
    title: 'Forward rate: the outbound metric that exposes every AI SDR',
    description: 'Open rate is vanity. Reply rate is closer. Forward rate is the only metric that proves a message earned its place in the inbox. How to measure it and what to expect.',
    category: 'Outbound',
    publishedAt: '2026-05-06',
    readingMinutes: 8,
    excerpt: 'Why open rate and reply rate stopped meaning anything once AI lifted both ceilings. What forward rate is, how to measure it, and what good looks like.',
  },
  {
    slug: 'migrating-off-zoominfo',
    title: 'Migrating off ZoomInfo in 2026: a build-vs-buy playbook',
    description: 'A 60-day plan to replace ZoomInfo with Verum, Provyx, or in-house pipelines. Cost math, data quality, and the migration order that keeps reps shipping.',
    category: 'Data',
    publishedAt: '2026-05-06',
    readingMinutes: 11,
    excerpt: 'ZoomInfo costs $100K-$300K and ages out of date the moment you license it. The build-or-replace decision math, plus the migration sequence that doesn\'t blow up reps mid-quarter.',
  },
  {
    slug: 'pe-portco-gtm-rebuild',
    title: 'The PE portco GTM rebuild: a 90-day playbook',
    description: 'After a take-private, the GTM stack always needs surgery. The 90-day rebuild order: pipeline hygiene first, ICP redefinition second, AI subagents last.',
    category: 'Playbooks',
    publishedAt: '2026-05-06',
    readingMinutes: 12,
    excerpt: 'Post-close, the GTM stack is always worse than the LOI claimed. The order of operations for the first 90 days, what to kill in week one, and where AI agents fit.',
  },
  {
    slug: 'tva-vs-pvp',
    title: 'Triggered Value Asset vs Permissionless Value Proposition: why agents need a different framework',
    description: 'PVP was built for humans drafting outbound. TVA is built for agents at scale. The technical reason the shareability bar matters when the writer is an LLM.',
    category: 'Methodology',
    publishedAt: '2026-05-06',
    readingMinutes: 9,
    excerpt: 'Jordan Crawford\'s PVP reshaped outbound for human writers. TVA borrows the spirit and adds an agent-native test: would the recipient forward this. Why the shift matters.',
  },
];

export function postsSorted(): BlogPost[] {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
