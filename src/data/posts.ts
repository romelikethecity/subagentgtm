export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: 'AI for GTM' | 'Claude Code' | 'Outbound' | 'Data' | 'Playbooks' | 'Methodology' | 'Reviews';
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
  {
    slug: 'salesforce-agentforce-review',
    title: 'Salesforce Agentforce review: where it works, where it stalls, and what to build instead',
    description: 'A practitioner review of Salesforce Agentforce in 2026. Real deployment failure modes, the per-conversation pricing trap, and when Claude Code subagents replace it.',
    category: 'Reviews',
    publishedAt: '2026-05-06',
    readingMinutes: 11,
    excerpt: 'Salesforce is selling Agentforce to everyone. Most deployments stall at configuration. Here\'s where Agentforce earns its license, where it doesn\'t, and the cost math nobody put in the AE deck.',
  },
  {
    slug: 'hubspot-breeze-deployment',
    title: 'HubSpot Breeze deployment in 2026: what works, what breaks, and the gaps to fill',
    description: 'A working guide to deploying HubSpot Breeze. Breeze Intelligence, Agents, and Copilot in production. Where Breeze hits limits and where Claude Code subagents take over.',
    category: 'Reviews',
    publishedAt: '2026-05-06',
    readingMinutes: 10,
    excerpt: 'HubSpot shipped Breeze across every hub. Most teams paid for it and never deployed it. Here\'s the working sequence: audit, configure, fill the gaps with Claude Code, hand off.',
  },
  {
    slug: 'event-driven-abm-playbook',
    title: 'Event-driven ABM in 2026: a playbook for trade-show pipelines that don\'t die in week three',
    description: 'How to run event ABM that converts. Pre-event signal capture, day-of subagent triage, post-event follow-up that gets forwarded. Why most event pipelines collapse and what to do.',
    category: 'Playbooks',
    publishedAt: '2026-05-06',
    readingMinutes: 11,
    excerpt: 'Most event pipelines are dead by week three. The ones that work run a subagent chain on the badge-scan list before the booth even closes. Pre-event, day-of, and post-event playbook.',
  },
  {
    slug: 'rfp-response-automation',
    title: 'RFP response automation in 2026: how to win procurement without burning your team',
    description: 'A practitioner guide to automating RFP and security questionnaire responses with Claude Code. Knowledge base setup, draft scoring, the human review loop, and the failure modes to watch.',
    category: 'Playbooks',
    publishedAt: '2026-05-06',
    readingMinutes: 10,
    excerpt: 'A 200-question security questionnaire takes a sales engineer 20 hours. A Claude Code subagent does the first draft in 12 minutes. The setup that makes it work plus the failure modes to avoid.',
  },
  {
    slug: 'icp-discovery-from-closed-won',
    title: 'ICP discovery from closed-won data: a 30-day rebuild for revenue teams',
    description: 'How to redefine your ICP from real closed-won data instead of marketing offsite assumptions. The 30-day sequence, the model validation step, and why most legacy ICPs are aspirational.',
    category: 'Playbooks',
    publishedAt: '2026-05-06',
    readingMinutes: 9,
    excerpt: 'Your ICP was set in a board meeting 18 months ago. Nobody checked whether the companies you actually close look anything like that profile. The 30-day rebuild from real win data.',
  },
  {
    slug: 'soc2-trust-center-buildout',
    title: 'SOC 2 / HIPAA trust center buildout: a 60-day plan that unblocks enterprise deals',
    description: 'How to ship a SOC 2 trust center that closes enterprise security reviews in days instead of weeks. The 60-day sequence, what goes on the page, and where Claude Code subagents handle the questionnaire load.',
    category: 'Playbooks',
    publishedAt: '2026-05-06',
    readingMinutes: 9,
    excerpt: 'Enterprise buyers want a trust center URL before they\'ll book the demo. The 60-day buildout: audit gaps, ship the page, wire questionnaire automation. What the page actually has to contain.',
  },
];

export function postsSorted(): BlogPost[] {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
