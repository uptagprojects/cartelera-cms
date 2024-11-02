CREATE TABLE IF NOT EXISTS cma__events (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    location TEXT,
    start_date date,
    end_date date,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);