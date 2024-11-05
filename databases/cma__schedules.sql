CREATE TABLE IF NOT EXISTS cma__schedules (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    start_date DATE,
    finish_date DATE,
    status VARCHAR(64),
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);