CREATE TABLE IF NOT EXISTS cma__users (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(120),
    avatar TEXT,
    password TEXT,
    status VARCHAR(20),
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

