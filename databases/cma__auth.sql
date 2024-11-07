CREATE TABLE IF NOT EXISTS cma__auth_recovery_codes
(
  user_id UUID PRIMARY KEY,
  code TEXT
);

 
CREATE TABLE IF NOT EXISTS cma__auth_sessions (
  id UUID PRIMARY KEY,
  user_id UUID,
  expires_at TIMESTAMPTZ,
  two_factor_verified BOOLEAN
);

CREATE TABLE IF NOT EXISTS cma__auth_email_verification_request (
    id UUID PRIMARY KEY,
    user_id UUID,
    email TEXT,
    code TEXT,
    expires_at INTEGER
);

CREATE TABLE IF NOT EXISTS cma__auth_password_reset_session (
    id UUID PRIMARY KEY,
    user_id UUID,
    email TEXT,
    code TEXT,
    expires_at INTEGER,
    email_verified INTEGER DEFAULT 0,
    two_factor_verified INTEGER DEFAULT 0
);