CREATE TABLE IF NOT EXISTS cma__courses (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    abstract TEXT,
    instructor JSON,
    picture TEXT,
    location TEXT,
    duration JSON,
    price NUMERIC,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

