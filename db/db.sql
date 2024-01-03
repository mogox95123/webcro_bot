CREATE DATABASE webcro_bot;

CREATE TABLE user (
    user_id INT NOT NULL PRIMARY KEY,
    api_key VARCHAR(255),
    subscription_end_date DATETIME
);
