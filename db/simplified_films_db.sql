DROP DATABASE if EXISTS films_simplified_db;

CREATE DATABASE films_simplified_db;

CREATE TABLE genre(
	genre_id SERIAL PRIMARY KEY,
	title varchar(128) NOT NULL
);

CREATE TABLE film(
	film_id SERIAL PRIMARY KEY,
	title varchar(128) NOT NULL,
	production_year int NOT NULL
);

CREATE TABLE film_genre(
	film_id int NOT NULL,
	genre_id INT NOT NULL,
FOREIGN KEY (film_id) REFERENCES film(film_id),
FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);
