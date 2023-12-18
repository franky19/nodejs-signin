import bcrypt from 'bcrypt';
import { sendVerificationEmail } from './emailService';
import jwt from 'jsonwebtoken';

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

export const registerUser = async (username: string, password: string, email: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const connection = await pool.getConnection();
    const result = await connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
    connection.release();
    // Example usage
    const secretKey = 'your_secret_key';
    const payload = { username: username, email: email };

    // Generate a token
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    await sendVerificationEmail(email,token);

    return 'Registration successful. Check your email for verification instructions.';
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Error registering user');
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [username]);
    connection.release();

    if (results.length > 0) {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        return 'Login successful';
      } else {
        throw new Error('Incorrect password');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Error logging in');
  }
};

export const verifiedUser = async (token: string) => {
  const connection = await pool.getConnection();
  try {
       // // Example usage
       const secretKey = 'your_secret_key';
       const decoded = jwt.verify(token, secretKey) as { email: string };
       const [results] = await connection.query('SELECT * FROM users WHERE email = ? and verified=0', [decoded.email]);
       connection.release();
      if (results.length > 0) {
          // Use a parameterized query to avoid SQL injection
          const [results] = await connection.query('UPDATE users SET verified = ? WHERE email = ?', [1, decoded.email]);
          connection.release();
          if (results.affectedRows > 0) {
            return decoded.email + " has already verified"
            // console.log(`User with ID ${userId} updated successfully.`);
          } else {
              return decoded.email + "cannot verified"
          }
      } else {
        return "your link is not valid"
      }
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Error registering user');
  }
};


