# ICP Rebuild Worksheet — 30 days

Rebuild your ICP from real closed-won data, not founder intuition. Drop this into a working doc and fill it out alongside your CRM data.

Source: subagent/gtm. License: free to use, modify, ship in your repo.

---

## Who this is for

Revenue teams whose:
- Outbound is underperforming on forward rate or reply rate
- AE conversion is uneven across segments
- Sales cycle keeps stretching for unclear reasons
- Legacy ICP was set in a planning offsite 12+ months ago and never validated

---

## What you need

- Last 18-24 months of closed-won deals from CRM (minimum 30, ideally 100+)
- Last 12 months of lost deals
- Current open pipeline
- Access to the AEs who closed the deals (for trigger reconstruction)

---

## Week 1: data preparation

### Pull every closed-won deal

For each closed-won, capture:

| Field | Source | Required |
|---|---|---|
| Company name | CRM | Yes |
| Industry | CRM / enrich | Yes |
| Employee count at purchase | CRM / enrich | Yes |
| Annual revenue at purchase | CRM / enrich | Optional |
| Geography | CRM | Yes |
| Buyer title | CRM | Yes |
| Buyer tenure (months in role) | LinkedIn check | Yes |
| Tech stack at purchase | BuiltWith | Optional |
| Lead source | CRM | Yes |
| Sales cycle (days) | CRM | Yes |
| Deal size (ARR) | CRM | Yes |
| **Trigger** | Reconstruct from notes / AE | **Yes (the high-leverage one)** |

### Trigger reconstruction (the most important step)

The trigger field is usually missing from CRM. Reconstruct it:

1. Pull won-deal notes from CRM
2. Slack or email the AE: "What changed in [Company]'s world that made them buy now?"
3. Categorize each trigger:
   - **Hire** — new role posted or filled
   - **Fund** — funded round
   - **Lead** — leadership change (CRO, CEO, VP)
   - **Stack** — tech-stack change (added/removed a tool)
   - **Reg** — regulatory filing or compliance event
   - **Comp** — competitor product issue / price hike / moderation
   - **Acq** — acquisition (theirs or a customer's)
   - **Internal** — internal pain crystallized (e.g., post-mortem)
   - **Unknown** — can't reconstruct (mark as "unknown" but don't guess)

Most teams discover the trigger for 60-80% of deals. Don't skip the others — the unknowns are still useful for demographic patterns.

---

## Week 2: pattern analysis

### Cluster by demographics

Group closed-won by:
- Company size (under 100, 100-500, 500-1500, 1500+)
- Industry vertical
- Geography (region)
- Buyer title
- Buyer tenure (under 6 months, 6-24, 24+)
- Tech stack signals (presence of specific tools)

### Surface patterns

Answer in writing:

1. **What size company tends to close fastest?** ____________
2. **Which industry verticals are over-represented vs total pipeline?** ____________
3. **What buyer tenure correlates with close rate?** ____________
4. **What tech stack signals predict fit?** ____________
5. **Which two triggers appear most often in closed-won?** ____________

### Draft segments

Most rebuilds surface 2-3 real segments, not the 4-6 the legacy ICP claimed. Write them out:

#### Primary segment
- Company profile: [...]
- Buyer profile: [...]
- Top 2 triggers: [...]
- Median sales cycle: [...]
- Win rate vs total pipeline: [...]

#### Secondary segment (if real)
[same structure]

#### Tertiary segment (if real)
[same structure]

---

## Week 3: lookalike disqualification

This is what stops the team from chasing accounts that look right but never close.

### Pull lost deals from last 12 months

Filter to ones that match the new primary segment demographically.

### Identify what's missing

For each lost deal that demographically matches your primary ICP, what was missing?
- Wrong trigger (or no trigger)?
- Wrong tech stack?
- Wrong buyer tenure (long-tenured, no urgency)?
- Different decision-maker than expected?

### Write the disqualification list

> Companies in [segment X] that lack [signal Y] are not ICP, regardless of how qualified they look on title and size.

Examples:
- "Series B SaaS in healthcare, but no VP Sales hire in last 60 days: not ICP."
- "Mid-market with our target tech stack, but buyer is in role 24+ months: not ICP (no urgency)."
- "Enterprise with right title, but no recent leadership change: not ICP (slow sales cycle)."

The disqualification list is what makes the rebuild work.

---

## Week 4: validation and rollout

### Test against lost deals

Apply the new ICP scoring to the last 12 months of lost deals. The new model should predict losses (lost deals should score out-of-ICP).

| Test | Pass? |
|---|---|
| 80%+ of lost deals score out-of-ICP | ☐ |
| Lost deals that score in-ICP have a clear "what was missing" reason | ☐ |
| Win rate on in-ICP segments is ≥2x out-of-ICP | ☐ |

### Test against open pipeline

| Test | Pass? |
|---|---|
| In-ICP open deals are progressing well (no stalls 60+ days) | ☐ |
| Out-of-ICP open deals are the ones reps are struggling with | ☐ |

### Test against a peer sample (optional)

If you can get a list of 20 known-lost deals from peers in your category, would your model have warned you off them? If yes, the model is tracking real signal.

---

## Deliverables

By end of day 30, you should have:

1. **Two-page ICP document** with primary + secondary segments, triggers, exclusions
2. **Scoring rubric** the team can apply to new accounts (template below)
3. **Disqualification list** of lookalike segments to skip
4. **Trigger taxonomy** of high-yield signals to monitor

These go into:
- The team CLAUDE.md (Section 2: ICP definition)
- The outbound subagent's signal scoring rubric
- The lead scoring rules in your CRM

---

## Scoring rubric template

```
Account: [Company name]
Segment match: ☐ Primary ☐ Secondary ☐ Out-of-ICP
Trigger present: ☐ Yes ☐ No
Trigger type: [hire / fund / lead / stack / reg / comp / acq / internal]
Trigger date: [YYYY-MM-DD] (must be last 60 days)
Disqualifier present: ☐ Yes ☐ No

Score:
- Segment match: 0-2
- Trigger STA: 0-9 (Specific, Timely, Actionable)
- No disqualifier: 0 or 1

Total: ___ / 12

Threshold to outbound: 8+
```

---

## What surprises teams during the rebuild

1. **The aspirational segment is dragging down win rate.** Teams chasing enterprise often discover their close rate at enterprise is 3-5% while mid-market is 18-25%.

2. **The trigger isn't what marketing thinks it is.** Marketing claims content/inbound; closed-won data shows hires, funding, leadership changes.

3. **The buyer title is wrong by 1-2 layers.** Legacy says "VP Sales"; closed-won shows CRO or Director of Sales Ops.

4. **20-30% of the legacy "ICP" is lookalikes.** Filtering them out raises win rate without hurting volume.

---

## Related references

- ICP discovery deep dive: https://subagentgtm.com/blog/icp-discovery-from-closed-won/
- 90-day PE portco rebuild (where ICP rebuild fits): https://subagentgtm.com/blog/pe-portco-gtm-rebuild/
- CLAUDE.md template (where the new ICP lands): https://subagentgtm.com/blog/claude-md-for-revenue-teams/
