CREATE TABLE IF NOT EXISTS cma__credentials (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    user_id UUID,
    external_id VARCHAR(200) UNIQUE,
    public_key TEXT,
    sign_count INT,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);