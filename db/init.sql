CREATE TABLE inventory (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL,
        image_url TEXT
    )