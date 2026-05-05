-- subagent/gtm newsletter subscribers
-- Apply with: npx wrangler d1 execute subagent-newsletter --file=./schema.sql --remote

CREATE TABLE IF NOT EXISTS subscribers (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  email           TEXT    NOT NULL,
  list            TEXT    NOT NULL DEFAULT 'gtm-triggers-weekly',
  source          TEXT,
  created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  unsubscribed_at TEXT,
  UNIQUE(email, list)
);

CREATE INDEX IF NOT EXISTS idx_subscribers_list ON subscribers(list);
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at);
CREATE INDEX IF NOT EXISTS idx_subscribers_unsubscribed ON subscribers(unsubscribed_at);
