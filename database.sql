CREATE DATABASE item_database;

--\c into item_database;

CREATE TABLE school(
    school_id SERIAL PRIMARY KEY,
    name VARCHAR (65535) UNIQUE NOT NULL,
    about VARCHAR (65535) NOT NULL,
    location VARCHAR (65535) NOT NULL,
    admission VARCHAR (65535) NOT NULL
);