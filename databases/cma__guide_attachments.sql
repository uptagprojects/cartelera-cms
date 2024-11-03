CREATE TABLE IF NOT EXISTS cma__guide_attachments (
    id UUID PRIMARY KEY,
    guide_id UUID,
    url TEXT,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)