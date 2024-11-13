CREATE TABLE IF NOT EXISTS cma__auth_verification_token
(
  identifier TEXT,
  expires TIMESTAMPTZ,
  token TEXT,
  PRIMARY KEY (identifier, token)
);


CREATE TABLE IF NOT EXISTS cma__auth_accounts (
  id UUID PRIMARY KEY,
  user_id UUID,
  type VARCHAR(255),
  provider VARCHAR(255),
  provider_account_id VARCHAR(255),
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT
);

CREATE TABLE IF NOT EXISTS cma__auth_sessions (
  id UUID PRIMARY KEY,
  user_id UUID,
  expires_at TIMESTAMPTZ,
  session_token VARCHAR(255)
);

