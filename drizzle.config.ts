import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD || undefined,
    database: process.env.DATABASE_NAME as string,
  },
  verbose: true,
  strict: true,
});
