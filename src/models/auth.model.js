const pool = require('../database/');

class AuthModel {
  async login(username, password) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM users WHERE username=$1 AND password=$2;';
    const values = [username, password];
    const data = await client.query(sql, values);
    client.release();
    return data.rows[0];
  }
}

module.exports = new AuthModel();