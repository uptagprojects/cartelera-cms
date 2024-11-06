CREATE TABLE IF NOT EXISTS cma__auth_verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);
 
CREATE TABLE IF NOT EXISTS cma__auh_accounts
(
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT
);
 
CREATE TABLE IF NOT EXISTS cma__auth_sessions
(
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  session_token VARCHAR(255) NOT NULL
);