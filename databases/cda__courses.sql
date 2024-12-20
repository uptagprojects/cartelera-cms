CREATE TABLE IF NOT EXISTS cda__courses (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    abstract TEXT,
    instructor JSON,
    duration JSON,
    price NUMERIC,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);