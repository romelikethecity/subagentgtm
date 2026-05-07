# CLAUDE.md (revenue team template)

Working template for a revenue-team CLAUDE.md. Every subagent reads this before drafting. Replace bracketed values with your actual data; keep the section structure.

Source: subagent/gtm. License: free to use, modify, ship in your repo.

Save as `CLAUDE.md` at the root of your GTM Claude Code repo.

---

## 1. Identity and audience

We're the GTM engineering team at [Company Name]. We sell [product] to [primary buyer persona] at [company segment].

The recipients of our outbound are senior operators who get 200+ cold messages a month. They unsubscribe from anything that reads as automated. The bar for our messages is whether the recipient would forward this to their boss, peer, or team.

Our voice is direct, operator-level, no hedging. First person plural. Honest about tradeoffs.

---

## 2. ICP definition

### Company segment
[Specific industry, size band, funding stage, geography]
Example: "Series B-D vertical SaaS in healthcare, finance, or industrial. 100-1,500 employees. US + Canada."

### Buyer titles
**Primary:** [Title 1, Title 2]
**Secondary:** [Title 3]
**Seniority floor:** [Director / VP / C-level]

### Triggering signals
The events that justify outbound. Score against the STA rubric.

- [Signal 1, e.g., "VP Sales hire posted in last 30 days"]
- [Signal 2, e.g., "Funded round in last 60 days, Series B+"]
- [Signal 3, e.g., "Tech-stack change to [Competitor]"]
- [Signal 4]
- [Signal 5]

### Required STA threshold
7/9 to send. Below 7, regenerate. Three failed regens, skip.

### Exclusions
- [Exclusion 1, e.g., "Companies in active down-round talks"]
- [Exclusion 2, e.g., "Companies under 50 employees regardless of vertical"]
- [Exclusion 3, e.g., "Companies that closed within last 90 days as customers"]
- [Lookalikes that almost qualify but shouldn't]

---

## 3. Voice rules and banned phrases

### Tone
Direct, operator-level, no hedging. Contractions allowed. First person plural.

### Banned punctuation
- Em dashes (—). Use periods, commas, or rewrite.
- Exclamation points.

### Banned phrases (auto-fail on send)
- "Just checking in"
- "I hope this finds you well"
- "Quick question"
- "Not just X, it's Y" / "isn't just X, it's Y" (negative parallelism)
- "Game-changer" / "Robust" / "Holistic" / "Cutting-edge" / "Seamless"
- "Leverage" as a verb
- "In today's [anything]"
- "Let's dive in" / "Let's explore"

### Banned structures
- Negative parallelism ("not X, but Y")
- Three-fragment dramatic triads
- Self-answered rhetorical questions
- Filler intensifiers (genuinely, truly, really, actually, quite, extremely)

### Required structures
1. First sentence is the trigger (the public signal).
2. Second sentence connects the trigger to the prospect's likely problem.
3. Third sentence offers something concrete to do this week.
4. Value-prop appears last and only as the answer to a problem.

---

## 4. Signal scoring rubric (STA)

Every draft scores against three criteria, 0-3 each. Pass threshold: 7/9.

### Specific (S)
Names, numbers, dates.
- 0: Generic, no prospect specifics.
- 1: One data point, no real signal.
- 2: A specific public signal cited correctly.
- 3: A specific signal tied to a unique recent pain or opportunity.

**Pass test:** could this message be sent to 50 other prospects? If yes, score 0 or 1.

### Timely (T)
Last 30 days, ideally last 7.
- 0: No date anchor.
- 1: Signal from 60+ days ago.
- 2: Signal from last 30 days.
- 3: Signal from last 7 days.

### Actionable (A)
Something they can do this week.
- 0: No CTA or vague.
- 1: Generic meeting ask.
- 2: Specific scoped offer for this week.
- 3: Score 2, plus independently valuable even if no reply.

**Below 7/9:** regenerate. Three failed regens on same prospect: skip and log.

---

## 5. Data contract

### CRM exports
Path: `/data/crm/`
Fields valid for personalization: `company_name`, `domain`, `industry`, `employee_count`, `funding_stage`
Refresh cadence: nightly
Read-only.

### Signal sources
- Hiring: BuiltIn, LinkedIn jobs API
- Funding: Crunchbase
- Leadership: LinkedIn People API
- Tech stack: BuiltWith
- Reviews: G2, Capterra
- Regulatory filings: SEC EDGAR, state SOS portals

Cite source URLs in dossiers. Every claim in a draft must trace to a source URL.

### Contact data
Path: `/data/contacts/`
Required fields: `email`, `phone`, `title`, `linkedin_url`
Fields validated within last 60 days.
Title fields must be cross-referenced against company website before citation.

### Hallucination risks (banned citations)
- LinkedIn titles not confirmed against company website
- Salary or compensation data not from a verified source
- Quotes from real people without a URL in the dossier
- Internal company strategy not publicly stated

---

## 6. Escalation rules

The agent stops and asks for human review when:

- Three failed regenerations on the same prospect, skip and log
- Signal references a person by name (not just title), require human approval
- Signal touches regulated topics: healthcare PHI, finance MNPI, education FERPA
- First 50 sends per new ICP segment require human approval before send
- Any send that would cite an unverified data point: regenerate without the citation

---

## 7. Few-shot examples

The leverage of the whole CLAUDE.md is here. Replace these with your team's actual best-performing messages.

### Example 1

**Trigger:** [Specific public signal, last X days]
**STA score:** S=3, T=3, A=2 (total 8/9)
**Message:**
```
[Final approved message verbatim]
```
**Outcome:** [forwarded / replied / booked meeting]

### Example 2
[same structure]

### Example 3
[same structure]

### Example 4
[same structure]

### Example 5
[same structure]

Update this section monthly. Add new winners. Retire patterns that stopped working.

---

## 8. Audit and metric definitions

Every draft logs:
- Prospect (company + contact)
- Signal source URL
- STA score breakdown
- Regeneration count
- Final decision (send / skip / queued)

Every send logs:
- Recipient
- Send timestamp
- Message hash
- Audit trail of regenerations

### Optimization metric
**Forward rate.** % of sent messages forwarded by the recipient (CC additions, "Fwd:" replies, post-meeting references).

Reply rate is secondary.
Open rate is not used for decisions.

Target: forward rate >= 0.5% on cold outbound, >= 2% on warm/event contexts.

---

## Maintenance

Weekly for the first month after launch. Monthly after that.

Triggers to update:
- A send produced a forwardable result → add to few-shot examples
- A send produced a polite decline → refine banned phrases
- A signal type produced great messages → raise its weight in scoring
- A signal type wasted sends → drop from qualifying list

A frozen CLAUDE.md is a dead system.

---

## Related references

- TVA framework full write-up: https://subagentgtm.com/methodology/
- Forward rate measurement guide: https://subagentgtm.com/blog/forward-rate-outbound-metric/
- Subagent architecture: https://subagentgtm.com/blog/claude-code-for-gtm/
