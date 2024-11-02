CREATE TABLE IF NOT EXISTS cma__announcements (
    id UUID PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    publish_date DATE,
    type VARCHAR(70),
    active BOOLEAN,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);