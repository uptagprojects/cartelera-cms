CREATE TABLE IF NOT EXISTS cartelera.cms__courses (
    id UUID PRIMARY KEY,
    name VARCHAR(200),
    abstract TEXT,
    start_date DATE,
    finish_date DATE,
    duration_hours NUMERIC, /* there is a posibility of half hours */
    image TEXT,
    location TEXT,
    price NUMERIC,
    occupied_seats INT,
    total_seats INT,
    online BOOLEAN,
    instructor_name VARCHAR(120),
    instructor_badge VARCHAR(120),
    instructor_avatar TEXT,
    instructor_related_url TEXT,
    instructor_email VARCHAR(120),
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

