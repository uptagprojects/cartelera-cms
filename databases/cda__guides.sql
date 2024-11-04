CREATE TABLE IF NOT EXISTS cda__guides (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    area VARCHAR(200),
    content TEXT,
    professor JSON,
    attachments JSON,
    published_date DATETIME,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);