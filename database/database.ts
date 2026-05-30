import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("snippets.db");

export default db;