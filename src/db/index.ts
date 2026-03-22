import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = await mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export const db = drizzle({ client: pool });

export type Database = typeof db;
export type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];

export type DBClient = Database | Transaction;
