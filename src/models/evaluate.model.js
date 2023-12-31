const pool = require('../database');

class EvaluateModel {
    async index() {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM Evaluate');
        client.release();
        return data.rows;
    }

    async save(evaluation) {
        const client = await pool.connect();
        const sql = 'INSERT INTO Evaluate(userid, movieid, rating, evaluationdate) VALUES ($1,$2,$3,$4);';
        const values = [evaluation.userid, evaluation.movieid, evaluation.rating, evaluation.evaluationdate];
        const result = await client.query(sql, values);
        client.release();
        return result;
    }

    async find(userid, movieid) {
        const client = await pool.connect();
        const sql = 'SELECT * FROM evaluate WHERE userid=$1 AND movieid=$2;';
        const values = [userid, movieid];
        const data = await client.query(sql, values);
        client.release();
        return data.rows;
    }

    async update(evaluation, newEvaluation) {
        const client = await pool.connect();
        const sql = 'UPDATE Evaluate SET userid=$1, movieid=$2, rating=$3, evaluationdate=$4 WHERE userid=$5 AND movieid=$6';
        const values = [evaluation.userid, evaluation.movieid, newEvaluation.rating, newEvaluation.evaluationdate, evaluation.userid, evaluation.movieid];
        const result = await client.query(sql, values);
        client.release();
        return result;
    }

    async remove(id) {
        const client = await pool.connect();
        const sql = 'DELETE FROM Evaluate where id=$1;';
        const result = await client.query(sql, [id]);
        client.release();
        return result;
    }

    async averageRating(movieid) {
        const client = await pool.connect();
        const sql = 'SELECT AVG(rating) AS avgrating FROM evaluate WHERE movieid=$1;';
        const values = [movieid];
        const data = await client.query(sql, values);
        const avgrating = parseFloat(data.rows[0].avgrating).toFixed(2);
        client.release();
        return avgrating;
    }
}

module.exports = new EvaluateModel();