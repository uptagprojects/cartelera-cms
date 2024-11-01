CREATE TABLE IF NOT EXISTS cda__announcements (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    area_id UUID,
    professor JSON,
    status VARCHAR(64),
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);