CREATE TABLE IF NOT EXISTS cma__courses (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    abstract TEXT,
    duration JSON,
    picture TEXT,
    instructor JSON,
    location TEXT,
    price NUMERIC,
    available_seats INT,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

