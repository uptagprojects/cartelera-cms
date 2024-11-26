CREATE TABLE IF NOT EXISTS cma__schedules (
    id UUID PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
