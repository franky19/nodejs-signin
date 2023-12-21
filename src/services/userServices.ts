// Replace this with your MySQL setup
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '#Mysql123',
    database: 'test',
    port:'3306'
  };
  
  const mysql = require('mysql2/promise');
  const pool = mysql.createPool(dbConfig);

export const checkUser =async (username:string,email:string) => {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    const [resultsUsername] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    connection.release();
    if (results.length > 0 || resultsUsername.length>0) {
        return "username/email found"
    }
    // return results;
}