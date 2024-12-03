const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'demo',
//   password: 'Pass@123',
//   database: 'recruitment_db_main',
// });

db.getConnection((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;  // Export the connection object for reuse
