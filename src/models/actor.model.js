const pool = require('../database');

class ActorModel {
    async index() {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM Actors');
        client.release();
        return data.rows;
    }

    async save(actor) {
        const client = await pool.connect();
        const sql = 'INSERT INTO Actors(name, age, movieid) VALUES ($1,$2,$3);';
        const values = [actor.Name, actor.Age, actor.MovieID];
        const result = await client.query(sql, values);
        client.release();
        return result;
    }

    async find(id) {
        const client = await pool.connect();
        const sql = 'SELECT * FROM Actors WHERE id=$1;';
        const values = [id];
        const data = await client.query(sql, values);
        client.release();
        return data.rows;
    }

    async update(id, newActor) {
        const client = await pool.connect();
        const sql = 'UPDATE Actors SET name=$1, age=$2, movieid=$3 WHERE id=$4';
        const values = [newActor.Name, newActor.Age, newActor.MovieID, id];
        const result = await client.query(sql, values);
        client.release();
        return result;
    }

    async remove(id) {
        const client = await pool.connect();
        const sql = 'DELETE FROM Actors where id=$1;';
        const result = await client.query(sql, [id]);
        client.release();
        return result;
    }

    async findByMovie(movieId) {
        const client = await pool.connect();
        const sql = 'SELECT * FROM Actors WHERE movieId=$1;';
        const values = [movieId];
        const data = await client.query(sql, values);
        client.release();
        return data.rows;
    }    
}

module.exports = new ActorModel();
