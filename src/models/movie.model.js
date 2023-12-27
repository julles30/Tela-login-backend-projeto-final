const client = require('../database');

class MoviesController {
  async index() {
    const conn = await client.conectar();
    const data = await conn.query('SELECT * FROM Movies');
    return data.rows
  }

  async save(movie) {
    const conn = await client.conectar();
    const sql = 'INSERT INTO Movies(Title, Director, ReleaseDate, Duration, Genre, ProductionCompany, BoxOffice, MediumRating) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';
    const values = [movie.Title, movie.Director, movie.ReleaseDate, movie.Duration, movie.Genre, movie.ProductionCompany, movie.BoxOffice, movie.MediumRating];
    return await conn.query(sql, values);
  }

  async find(id) {
    const conn = await client.conectar();
    const sql = 'SELECT * FROM Movies WHERE id=$1;';
    const values = [id];
    const data = await conn.query(sql, values);
    return data.rows;
  }

  async update(id, movie) {
    const conn = await client.conectar();
    const sql = 'UPDATE Movies SET Title=$1, Director=$2, ReleaseDate=$3, Duration=$4, Genre=$5, ProductionCompany=$6, BoxOffice=$7, MediumRating=$8 WHERE id=$9';
    const values = [movie.Title, movie.Director, movie.ReleaseDate, movie.Duration, movie.Genre, movie.ProductionCompany, movie.BoxOffice, movie.MediumRating, id];
    return await conn.query(sql, values);
  }

  async remove(id) {
    const conn = await client.conectar();
    const sql = 'DELETE FROM Movies where id=$1;';
    return await conn.query(sql, [id]);
  }
}

module.exports = new MoviesController();
