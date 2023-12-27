const client = require('../database');

class EvaluateModel {
    async index() {
        const conn = await client.conectar();
        const data = await conn.query('SELECT * FROM Evaluate');
        return data.rows

    }

    async save(evaluation) {
        const conn = await client.conectar();
        const sql = 'INSERT INTO Evaluate(UserID, MovieID, Rating, EvaluationDate) VALUES ($1,$2,$3,$4);';
        const values = [evaluation.UserID, evaluation.MovieID, evaluation.Rating, evaluation.EvaluationDate];
        return await conn.query(sql, values);
    }

    async find(id) {
        const conn = await client.conectar();
        const sql = 'SELECT * FROM Evaluate WHERE id=$1;';
        const values = [id];
        const data = await conn.query(sql, values);
        return data.rows;
    }

    async update(id, evaluation) {
        const conn = await client.conectar();
        const sql = 'UPDATE Evaluate SET UserID=$1, MovieID=$2, Rating=$3, EvaluationDate=$4 WHERE id=$5';
        const values = [evaluation.UserID, evaluation.MovieID, evaluation.Rating, evaluation.EvaluationDate, id];
        return await conn.query(sql, values);
    }

    async remove(id) {
        const conn = await client.conectar();
        const sql = 'DELETE FROM Evaluate where id=$1;';
        return await conn.query(sql, [id]);
    }
}

module.exports = new EvaluateModel();
