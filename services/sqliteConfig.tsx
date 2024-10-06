import { digestData } from '@/utils/crypto';
import { log } from '@/utils/toolBox';
import * as SQLite from 'expo-sqlite';

// Custom error class (optional)
class SQLiteError extends Error {
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
  code: string;
}

// Centralized error handling (optional)
export const handleSQLiteError = (err: any) => {
  // Log the error with details
  log("SQLite Error:", err.message, err.code);
  // Re-throw the error or return a custom error object
  throw new SQLiteError(err.message, err.code);
};

export const db = SQLite.openDatabaseSync('cpim.db');

export const dropSQLiteTable = async () => {
  await db.execAsync(`
    DROP TABLE users;
    DROP TABLE parts;
    DROP TABLE cars;
  `);
};

// Init db connection
export const initSQLiteDB = async () => {
  await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        PRAGMA foreign_keys = 'ON';
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          username TEXT NOT NULL, 
          password TEXT NOT NULL, 
          isAuth INTEGER NOT NULL CHECK (isAuth IN (0, 1))
        );
        CREATE TABLE IF NOT EXISTS cars (
          idCar INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          brandCar TEXT NOT NULL, 
          modelCar TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS parts (
          idPart INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          imagePath TEXT NOT NULL, 
          registrationNumber TEXT NOT NULL, 
          name TEXT NOT NULL, 
          partCount INTEGER NOT NULL, 
          createdAt TEXT, 
          updatedAt TEXT, 
          idPartCar INTEGER NOT NULL, 
          FOREIGN KEY(idPartCar) REFERENCES parts(idCar)
        );
    `);

  // Digest default password(hashing phase)
  const hashedPassword = await digestData("admin");

  const result = await db.getFirstAsync<{ username: string }>("SELECT username FROM users");

  if (!result?.username) {
    // Insert default login with hashed password
    await db.runAsync(
      'INSERT INTO users (username, password, isAuth) VALUES (?, ?, ?)', 
      "admin", hashedPassword, false
    );
  }
};
