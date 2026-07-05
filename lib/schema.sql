-- Run this in the Neon SQL console to set up all tables.

-- NextAuth required tables (table names match @auth/neon-adapter)
CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT,
  email TEXT NOT NULL,
  "emailVerified" TIMESTAMPTZ,
  image TEXT
);

CREATE TABLE accounts (
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  PRIMARY KEY (provider, "providerAccountId")
);

CREATE TABLE sessions (
  "sessionToken" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE verification_token (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- App analysis history
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  glow_score NUMERIC(3,1) NOT NULL,
  top_priority TEXT NOT NULL,
  insights JSONB NOT NULL,
  routine JSONB NOT NULL,
  annotations JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX analyses_user_id_idx ON analyses(user_id);
CREATE INDEX analyses_created_at_idx ON analyses(created_at DESC);
