import db from "./database";

export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS snippets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        code TEXT NOT NULL,
        language TEXT NOT NULL,
        tags TEXT,
        favorite INTEGER DEFAULT 0,
        createdAt TEXT
      );
    `);

    console.log("Database Initialized");
  } catch (error) {
    console.log(error);
  }
};