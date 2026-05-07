export interface Resource {
  slug: string;
  title: string;
  description: string;
  category: 'Methodology' | 'Templates' | 'Worksheets';
  fileName: string;
  fileSize: string;
  lineCount: number;
  excerpt: string;
  useCase: string;
}

export const resources: Resource[] = [
  {
    slug: 'tva-rubric',
    title: 'TVA scoring rubric',
    description: 'The Triggered Value Asset rubric every subagent self-scores against. Drop it into your repo and reference from CLAUDE.md.',
    category: 'Methodology',
    fileName: 'tva-rubric.md',
    fileSize: '~3 KB',
    lineCount: 130,
    excerpt: 'Specific, Timely, Actionable. Score 0-3 each. Pass threshold 7/9. Below 7, regenerate. Three failed regens, skip and log.',
    useCase: 'Save as tva-rubric.md in your repo. Reference from your audit subagent prompt: "Read tva-rubric.md. Score the draft against each criterion."',
  },
  {
    slug: 'claude-md-template',
    title: 'CLAUDE.md template (revenue team)',
    description: 'Working CLAUDE.md template for a GTM Claude Code repo. Eight sections covering ICP, voice, signal scoring, data contract, escalation rules.',
    category: 'Templates',
    fileName: 'claude-md-revenue-template.md',
    fileSize: '~7 KB',
    lineCount: 220,
    excerpt: 'Identity. ICP. Voice rules and banned phrases. Signal scoring (STA). Data contract. Escalation rules. Few-shot examples. Audit and metrics.',
    useCase: 'Save as CLAUDE.md at the root of your GTM Claude Code repo. Replace bracketed values with your actual data; keep the section structure.',
  },
  {
    slug: 'icp-rebuild-worksheet',
    title: 'ICP rebuild worksheet (30 days)',
    description: 'Working doc for rebuilding your ICP from real closed-won data. Week-by-week sequence, scoring rubric template, validation tests.',
    category: 'Worksheets',
    fileName: 'icp-rebuild-worksheet.md',
    fileSize: '~6 KB',
    lineCount: 200,
    excerpt: 'Pull 18-24 months of closed-won. Reconstruct triggers. Cluster patterns. Disqualify lookalikes. Validate against lost deals and open pipeline.',
    useCase: 'Use as a working doc through a 30-day rebuild engagement. Output feeds the CLAUDE.md ICP section and the outbound subagent scoring rubric.',
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
