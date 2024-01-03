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
        const sql = 'INSERT INTO Actors(name, birthdate, nationality) VALUES ($1,$2,$3);';
        const values = [actor.name, actor.birthdate, actor.nationality];
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
        const sql = 'UPDATE Actors SET name=$1, birthdate=$2, nationality=$3 WHERE id=$4';
        const values = [newActor.name, newActor.birthdate, newActor.nationality, id];
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
}

module.exports = new ActorModel();
