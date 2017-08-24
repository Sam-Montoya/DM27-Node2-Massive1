/*This class can be used for values when the server is restarted, like admin logins. */
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    country VARCHAR(20)
);

INSERT INTO users (name, age, country)
VALUES
('Brettly', 17, 'Singapore'),
('Wheatly', 16, 'Sandy'),
('Sam', 18, 'Jovo'),
('Wheatly', 18, 'Jovo'),
('Sam', 14, 'Jovo'),
('Brettly', 19, 'Jovo');