CREATE TABLE IF NOT EXISTS cma__guides (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    area_id UUID,
    author_id UUID,
    status VARCHAR(64),
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);