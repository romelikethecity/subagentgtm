# TVA Scoring Rubric

Triggered Value Asset. The framework every outbound message passes before it sends.

Source: subagent/gtm. License: free to use, modify, ship in your repo.

---

## Use this file in your repo

Save as `tva-rubric.md` at your repo root, or in `/subagents/audit/tva-rubric.md`. Reference it from your CLAUDE.md and from the audit subagent's prompt:

```
Read tva-rubric.md. Score the draft against each criterion (0-3).
Sum to a total. If total >= 7, queue for send. If total < 7, regenerate.
On the third failed regeneration for the same prospect, skip and log.
```

---

## The three criteria

### 1. Specific (S)

Names. Numbers. Dates.

**Score 0** — Generic. No specifics from the prospect's world. ("We help B2B SaaS companies grow.")

**Score 1** — One specific data point, but not a real signal. ("I see you're at [Company].")

**Score 2** — A specific public signal cited correctly. ("Saw your $12M Series B last month.")

**Score 3** — A specific signal cited correctly AND tied to a unique pain or opportunity that's recent. ("Saw your $12M Series B and the 4 senior React roles posted last week. Series B + engineering hire surge usually means you're 60-90 days from a CRO search.")

**Pass test:** could the message be sent to 50 other prospects with minor edits? If yes, it's a 0 or 1.

---

### 2. Timely (T)

Last 30 days. Ideally last 7.

**Score 0** — No date anchor. The message would have been valid 12 months ago.

**Score 1** — A real signal, but stale (60+ days). Reads as outdated research.

**Score 2** — Signal from the last 30 days. Recent enough to feel current.

**Score 3** — Signal from the last 7 days. Reads as "we're paying attention right now."

**Pass test:** if the recipient asked "how do you know this," would the answer be "from a public event in the last 30 days?"

---

### 3. Actionable (A)

Something they can do this week.

**Score 0** — No call to action, or one that's vague ("happy to chat").

**Score 1** — A meeting ask with no specific framing.

**Score 2** — A concrete, scoped offer the recipient could engage with this week. ("I'd send you our 90-day GTM rebuild plan we ran for [similar Series B]. Want it?")

**Score 3** — Score 2 plus the offer is independently valuable to the recipient even if they don't book a meeting. ("Forwarding our 90-day GTM rebuild plan now. Open me back if you want to talk.")

**Pass test:** if the recipient never replies, did they still get something useful from the message?

---

## Scoring

```
Specific:  ___ / 3
Timely:    ___ / 3
Actionable: ___ / 3
─────────────────
Total:     ___ / 9
```

**Threshold: 7+ to send.** Below 7, regenerate. Three failed regenerations on the same prospect, skip and log.

---

## The forwardability test (final check)

Even with 7+, ask the meta-question:

> Would the recipient forward this to their boss, peer, or team?

If no, regenerate regardless of score. Forwardability is the bar TVA was built to enforce.

---

## Banned phrases (auto-zero on Specific)

- "Just checking in"
- "I hope this finds you well"
- "Quick question"
- "Hope you're having a great week"
- Any version of "I'd love to learn more about your business"
- Any sentence that could appear unchanged in a competitor's outbound

---

## Self-scoring template for agents

```yaml
draft:
  text: |
    [the draft message]
  
  scoring:
    specific:
      score: 2
      reasoning: "Cites Series B + 4 React job posts, both within last 30 days"
    timely:
      score: 3
      reasoning: "Series B announced 12 days ago"
    actionable:
      score: 2
      reasoning: "Offers to send the 90-day plan; recipient can accept or pass"
    total: 7
  
  forwardability_check:
    pass: true
    reasoning: "VP would share the 90-day plan with their CRO"
  
  decision: SEND
```

---

## Lineage

TVA was developed by Rome Thorndike at subagent/gtm, building on Jordan Crawford's Permissionless Value Proposition (PVP) framework at Cannonball GTM. PVP asked "would they pay for this?" TVA asks "is the message the right asset for the trigger we observed, and is it worth forwarding?"

Read the full methodology: https://subagentgtm.com/methodology/

Read the comparison post: https://subagentgtm.com/blog/tva-vs-pvp/
