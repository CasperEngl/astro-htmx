import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { env } from "./env";

// create the connection
const poolConnection = mysql.createPool({
  uri: env.DATABASE_URL,
  multipleStatements: true,
});

const db = drizzle(poolConnection);

// this will automatically run needed migrations on the database
await migrate(db, { migrationsFolder: "./drizzle" });
