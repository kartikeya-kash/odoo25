const pool = require('../config/db');

const createUser = async ({ name, email, passwordHash, role = 'user', avatar = null }) => {
  const [result] = await pool.execute(
    'INSERT INTO user (name, email, password_hash, role, avatar) VALUES (?, ?, ?, ?, ?)',
    [name, email, passwordHash, role, avatar]
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM user WHERE id = ?', [id]);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
