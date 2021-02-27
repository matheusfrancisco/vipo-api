import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const {
  DB_PROD_HOST,
  DB_PROD_PORT,
  DB_PROD_USER,
  DB_PROD_PASS,
  NODE_ENV
} = process.env;

if (!DB_PROD_HOST || !DB_PROD_PORT || !DB_PROD_USER || !DB_PROD_PASS)
  throw new Error("Missing environment variables!");

export default {
  DB_PROD_HOST,
  DB_PROD_PORT: Number(DB_PROD_PORT),
  DB_PROD_USER,
  DB_PROD_PASS,
  NODE_ENV
};
