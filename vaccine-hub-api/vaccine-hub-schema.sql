CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    password       TEXT NOT NULL,
    firstName     TEXT NOT NULL,
    lastName      TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    location       TEXT NOT NULL,
    date        DATE NOT NULL DEFAULT CURRENT_DATE

);