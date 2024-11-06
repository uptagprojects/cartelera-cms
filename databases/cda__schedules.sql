CREATE TABLE IF NOT EXISTS cda__schedules (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    start_date DATE,
    end_date DATE,
    attachments JSON,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)