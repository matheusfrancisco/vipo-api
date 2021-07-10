import { ConnectionOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import envs from "@config/environment";

const prodOrDevConfig: PostgresConnectionOptions = {
  type: "postgres",
  database: "vipo",
  logging: true
};
const testConfig: PostgresConnectionOptions = {
  type: "postgres",
  database: "postgres",
  logging: false
};
const dbConfigToUse = envs.NODE_ENV === "test" ? testConfig : prodOrDevConfig;

const databaseConfig: ConnectionOptions = {
  ...dbConfigToUse,
  port: envs.DB_PROD_PORT,
  host: envs.DB_PROD_HOST,
  synchronize: envs.MIGRATION,
  username: envs.DB_PROD_USER,
  password: envs.DB_PROD_PASS,
  entities: ["src/infrastructure/database/entity/*.ts"],
  migrations: ["src/infrastructure/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/infrastructure/database/migrations"
  },
  extra: {
    connectionLimit: 5
  }
};

export default databaseConfig;
