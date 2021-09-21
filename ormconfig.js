const base_path =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "./src"
    : "./dist";
const type_file =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "*.ts"
    : "*.js";
const envs = require(`${base_path}/config/environment`);

const prodOrDevConfig = {
  type: "postgres",
  database: "vipo_db",
  synchronize: false,
  logging: false
};

const testConfig = {
  type: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false
};

const dbConfigToUse =
  envs.default.NODE_ENV === "test" ? testConfig : prodOrDevConfig;

const databaseConfig = {
  ...dbConfigToUse,
  port: envs.default.DB_PROD_PORT,
  host: envs.default.DB_PROD_HOST,
  synchronize: envs.default.MIGRATION || true,
  username: envs.default.DB_PROD_USER,
  password: envs.default.DB_PROD_PASS,
  entities: [`${base_path}/infrastructure/database/entity/${type_file}`],
  migrations: [`${base_path}/infrastructure/database/migrations/${type_file}`],
  cli: {
    migrationsDir: `${base_path}/infrastructure/database/migrations`
  },
  extra: {
    connectionLimit: 5
  }
};

module.exports = databaseConfig;
