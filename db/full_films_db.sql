DROP DATABASE if EXISTS films_full_db;

CREATE DATABASE films_full_db;

CREATE TABLE person(
	person_id SERIAL PRIMARY KEY,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL
);

CREATE TABLE genre(
	genre_id SERIAL PRIMARY KEY,
	title varchar(128) NOT NULL
);

CREATE TABLE audience(
	audience_id SERIAL PRIMARY KEY,
	country varchar(128),
	quantity int
);

CREATE TABLE film(
	film_id SERIAL PRIMARY KEY,
	title varchar(128) NOT NULL,
	description varchar(255) NOT NULL,
	production_year int NOT NULL,
	production_country int NOT NULL,
	tagline varchar(128) NOT NULL,
	fk_director_id int NOT NULL,
	fk_screenwriter_id int NOT NULL,
	fk_producer_id int NOT NULL,
	fk_operator_id int NOT NULL,
	fk_composer_id int NOT NULL,
	fk_artist_id int NOT NULL,
	fk_editor_id int NOT NULL,
	budget int,
	marketing int,
	cash_usa int,
	cash_world int,
	premiere_country varchar(128),
	premiere_world varchar(128),
	release_dvd varchar(128),
	min_age int,
	rating_mpaa varchar(128),
	duration int,
FOREIGN KEY (fk_director_id) REFERENCES person(person_id),
FOREIGN KEY (fk_screenwriter_id) REFERENCES person(person_id),
FOREIGN KEY (fk_producer_id) REFERENCES person(person_id),
FOREIGN KEY (fk_operator_id) REFERENCES person(person_id),
FOREIGN KEY (fk_composer_id) REFERENCES person(person_id),
FOREIGN KEY (fk_artist_id) REFERENCES person(person_id),
FOREIGN KEY (fk_editor_id) REFERENCES person(person_id)
);

CREATE TABLE film_person(
	film_id int NOT NULL,
	person_id INT NOT NULL,
	person_role varchar(128) NOT NULL,
FOREIGN KEY (film_id) REFERENCES film(film_id),
FOREIGN KEY (person_id) REFERENCES person(person_id)
);

CREATE TABLE film_genre(
	film_id int NOT NULL,
	genre_id INT NOT NULL,
FOREIGN KEY (film_id) REFERENCES film(film_id),
FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE film_audience(
	film_id int NOT NULL,
	audience_id INT NOT NULL,
FOREIGN KEY (film_id) REFERENCES film(film_id),
FOREIGN KEY (audience_id) REFERENCES audience(audience_id)
);


