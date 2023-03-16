const db = require('../db');

class FilmController {
    async createGenre(req, res) {
        const {title} = req.body;
        const newGenre = await db.query("INSERT into genre (title) values ($1) RETURNING *", [title]);
        res.send(newGenre.rows[0]);
    }

    async getGenres(req, res) {
        const {id} = req.params;
        if (id) {
            const genres = await db.query(`SELECT * FROM genre where genre_id=$1`,[id]);
            res.send(genres.rows[0]);
        } else {
            const genres = await db.query(`SELECT * FROM genre`);
            res.send(genres.rows);
        }
    }

    async updateGenre(req, res) {
        const {id} = req.params;
        const {title} = req.body;

        if (id) {
            let updatedGenre;
            const genre = await db.query("SELECT * FROM genre WHERE genre_id = $1", [id]);
            if (title) {
                updatedGenre = await db.query('UPDATE genre set title = $1 WHERE genre_id = $2 RETURNING *', [title, id]);
                res.send(updatedGenre.rows[0]);
            } else {
                res.send(genre.rows[0]);
            }
        } else {
            throw new Error('id of "film" did not specified');
        }
    }

    async deleteGenre(req, res) {
        const {id} = req.params;
        if (id) {
            const genre = await db.query(`DELETE FROM genre WHERE genre_id = $1  RETURNING *`, [id]);
            res.send(genre.rows[0]);
        } else {
            throw new Error('id of "genre" did not specified');
        }
    }
}

module.exports = new FilmController();