const pool = require('../database');

class UserModel {
  async index() {
    const client = await pool.connect();
    const data = await client.query('SELECT * FROM users');
    client.release();
    return data.rows;
  }

  async save(name, username, password) {
    const client = await pool.connect();
    const sql = 'INSERT INTO users(name, username, password) VALUES ($1,$2,$3);';
    const values = [name, username, password];
    const result = await client.query(sql, values);
    client.release();
    return result;
  }

  async find(id) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM users WHERE id=$1;';
    const values = [id];
    const data = await client.query(sql, values);
    client.release();
    return data.rows;
  }

  async update(id, user) {
    const client = await pool.connect();
    const sql = 'UPDATE users SET name=$1, username=$2, password=$3 WHERE id=$4';
    const values = [user.name, user.username, user.password, id];
    const result = await client.query(sql, values);
    client.release();
    return result;
  }

  async remove(id) {
    const client = await pool.connect();
    const sql = 'DELETE FROM users where id=$1;';
    const result = await client.query(sql, [id]);
    client.release();
    return result;
  }

  async checkUserExists(username) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM users WHERE username=$1;';
    const values = [username];
    const data = await client.query(sql, values);
    client.release();
    return data.rows.length > 0
  }
}

module.exports = new UserModel();