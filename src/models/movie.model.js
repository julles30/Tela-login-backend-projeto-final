const pool = require('../database');

class MoviesController {
  async index() {
    const client = await pool.connect();
    const data = await client.query('SELECT * FROM Movies');
    client.release();
    return data.rows;
  }

  async save(movie) {
    const client = await pool.connect();
    const sql = 'INSERT INTO Movies(Title, Director, ReleaseDate, Duration, Genre, ProductionCompany, BoxOffice, MediumRating) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';
    const values = [movie.Title, movie.Director, movie.ReleaseDate, movie.Duration, movie.Genre, movie.ProductionCompany, movie.BoxOffice, movie.MediumRating];
    const result = await client.query(sql, values);
    client.release();
    return result;
  }

  async find(id) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM Movies WHERE id=$1;';
    const values = [id];
    const data = await client.query(sql, values);
    client.release();
    return data.rows;
  }

  async update(id, movie) {
    const client = await pool.connect();
    const sql = 'UPDATE Movies SET Title=$1, Director=$2, ReleaseDate=$3, Duration=$4, Genre=$5, ProductionCompany=$6, BoxOffice=$7, MediumRating=$8 WHERE id=$9';
    const values = [movie.Title, movie.Director, movie.ReleaseDate, movie.Duration, movie.Genre, movie.ProductionCompany, movie.BoxOffice, movie.MediumRating, id];
    const result = await client.query(sql, values);
    client.release();
    return result;
  }

  async remove(id) {
    const client = await pool.connect();
    const sql = 'DELETE FROM Movies where id=$1;';
    const result = await client.query(sql, [id]);
    client.release();
    return result;
  }
}

module.exports = new MoviesController();
