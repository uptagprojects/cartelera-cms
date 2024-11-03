CREATE TABLE IF NOT EXISTS cda__guides (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    area_id UUID,
    professor JSON,
    attachments JSON,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);