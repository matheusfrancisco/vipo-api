import { ConnectionOptions } from 'typeorm'

//#TODO using ormconfig to get value from dev (.env)
//and production and pass it to connections
const PROD_ENV = 'production'



const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: "localhost",
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ["src/infrastructure/entity/**/*.ts"],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    migrationsDir: 'src/migrations'
  }
}

export = connectionOptions