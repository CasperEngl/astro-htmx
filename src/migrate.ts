import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import sqlite from "better-sqlite3";

const connectionString = "sqlite.db";
const sql = sqlite(connectionString);
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "drizzle" });
