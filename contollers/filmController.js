const db = require('../db');

class FilmController {
    async createFilm(req, res) {
        const {title,production_year,genre_id} = req.body;
        const newFilm = await db.query(`INSERT INTO film (title,production_year) values ($1, $2) RETURNING *`,[title,production_year])
        const filmID = newFilm.rows[0].film_id;

        if(genre_id && genre_id.length >0){
            let queryToFilmGenre = "INSERT INTO film_genre (film_id, genre_id) values ";
            for (let i = 0; i < genre_id.length; i++) {
                const genre_id = genre_id[i];
                queryToFilmGenre += `(${filmID}, ${genre_id})`;
                if (i !== genre_id.length - 1) {
                    queryToFilmGenre += ","
                }
            }
            db.query(queryToFilmGenre);
        }
        
        res.send(newFilm.rows[0])

    }

    async getFilms(req, res) {
        const id = req.params.id;
        if (id) {
            const film = await db.query(`SELECT * FROM film where film_id=$1`, [id]);
            res.send(film.rows[0]);
        } else {
            const films = await db.query(`SELECT * FROM film `);
            res.send(films.rows);
        }
    }

    async updateFilm(req, res) {
        const {id} = req.params;
        const {title, production_year, genre_id} = req.body;

        if (id) {
            let updatedFilm;
            const film = await db.query("SELECT * FROM film WHERE film_id = $1", [id]);

            if (title && production_year) {
                updatedFilm = await db.query('UPDATE film set title = $1, production_year = $2 WHERE film_id = $3 RETURNING *', [title, production_year, id]);
            } else if (title) {
                updatedFilm = await db.query('UPDATE film set title = $1 WHERE film_id = $2 RETURNING *', [title, id]);
            } else if (production_year) {
                updatedFilm = await db.query('UPDATE film set production_year = $1 WHERE film_id = $2 RETURNING *', [production_year, id]);
            }

            if (genre_id && genre_id.length > 0) {
                await db.query(`DELETE FROM film_genre WHERE film_id = ${id}`)

                const filmID = newFilm.rows[0].film_id;
                if(genre_id && genre_id.length >0){
                    let queryToFilmGenre = "INSERT INTO film_genre (film_id, genre_id) values ";
                    for (let i = 0; i < genre_id.length; i++) {
                        const genre_id = genre_id[i];
                        queryToFilmGenre += `(${filmID}, ${genre_id})`;
                        if (i !== genre_id.length - 1) {
                            queryToFilmGenre += ","
                        }
                    }
                    db.query(queryToFilmGenre);
                }

            }

            if (updatedFilm) {
                res.send(updatedFilm.rows[0]);
            } else {
                res.send(film.rows[0]);
            }
        } else {
            throw new Error('id of "film" did not specified');
        }
    }

    async deleteFilm(req, res) {
        const {id} = req.params;
        if(id){
            const film = await db.query(`DELETE FROM film WHERE film_id = $1  RETURNING *`, [id]);
            res.send(film.rows[0])
        } else {
            throw new Error('id of "film" did not specified');
        }
    }
}

module.exports = new FilmController();