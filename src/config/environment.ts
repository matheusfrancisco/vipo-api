import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const {
  DB_PROD_HOST,
  DB_PROD_PORT,
  DB_PROD_USER,
  DB_PROD_PASS,
  GOOGLE_CLIENT_ID,
  MIGRATION,
  NODE_ENV
} = process.env;

if (
  !DB_PROD_HOST ||
  !DB_PROD_PORT ||
  !DB_PROD_USER ||
  !DB_PROD_PASS ||
  !MIGRATION||
  !GOOGLE_CLIENT_ID
)
  throw new Error("Missing environment variables!");

export default {
  DB_PROD_HOST,
  DB_PROD_PORT: Number(DB_PROD_PORT),
  DB_PROD_USER,
  DB_PROD_PASS,
  GOOGLE_CLIENT_ID,
  MIGRATION: Boolean(MIGRATION),
  NODE_ENV
};
