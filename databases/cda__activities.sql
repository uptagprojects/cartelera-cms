CREATE TABLE IF NOT EXISTS cda__activities (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    context TEXT,
    type VARCHAR(70),
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);