import mysql from 'mysql2/promise';
import { config } from './environment';

export const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function testConnection() {
  try {
    console.log('Attempting to connect to the database...');
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT 1 AS result');
    console.log('Connection successful!', rows);
    
    connection.release();
  } catch (error: any) {
    console.error('Database connection failed:', error.message);
  } finally {
    await pool.end();
    console.log('Database pool closed.');
  }
}