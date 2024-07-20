CREATE TABLE IF NOT EXISTS cartelera.cma__course_periods (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL,
    start_period TIMESTAMPTZ,
    finish_period TIMESTAMPTZ,
    duration_hours NUMERIC,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stored_update_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);