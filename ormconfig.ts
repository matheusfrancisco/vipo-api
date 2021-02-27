import { ConnectionOptions } from "typeorm";

// #TODO using ormconfig to get value from dev (.env)
// and production and pass it to connections
const PROD_ENV = "production";
let connectionOptions: ConnectionOptions;

// #TODO have alot dupliacate code, move to a method and get config from env

if (process.env.NODE_ENV === "test") {
  connectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "vipo",
    entities: ["src/infrastructure/entity/**/*.ts"],
    // We are using migrations, synchronize should be set to false.
    synchronize: true,
    dropSchema: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,
    logging: ["warn", "error"],
    migrations: ["src/migrations/**/*.ts"],
    cli: {
      migrationsDir: "src/migrations"
    }
  };
} else {
  connectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "vipo",
    entities: ["src/infrastructure/entity/**/*.ts"],
    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    dropSchema: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,
    logging: ["warn", "error"],
    migrations: ["src/migrations/**/*.ts"],
    cli: {
      migrationsDir: "src/migrations"
    }
  };
}

export = connectionOptions;
