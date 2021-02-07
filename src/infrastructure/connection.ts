import { Connection, createConnection, getRepository } from "typeorm";

export class CreateDatabaseConnection {
  private static connection: Connection;
  private static connection_test: Connection;

  public static async createConnection(config: string = "prod") {
    //#TODO have alot dupliacate code, move to a method and get config from env
    if(config === "test") {
      if (!this.connection_test) {
        //#TODO this can be a method
        this.connection_test = await createConnection({
          type: "postgres",
          host: "localhost",
          port: 5433,
          username: "postgres",
          password: "postgres",
          database: "postgres",
          entities: ["src/infrastructure/entity/**/*.ts"],
          migrations: ["src/migrations/**/*.ts"],
          cli: {
            "migrationsDir": "src/migrations"
          },
          extra: {
            "connectionLimit": 5
          },
          synchronize: true,
          logging: false
        });
      }
      return this.getConnection(config)
    } else {
      if (!this.connection) {
        //#TODO this can be a method
        this.connection = await createConnection({
          name: "default",
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "postgres",
          database: "vipo",
          entities: ["src/infrastructure/entity/**/*.ts"],
          migrations: ["src/migrations/**/*.ts"],
          cli: {
            "migrationsDir": "src/migrations"
          },
          extra: {
            "connectionLimit": 5
          },
          synchronize: false,
          logging: true
        });
      }
      return this.connection;
    }
  }

  public static getConnection(config: string = "prod") {
    return config === "test" ? this.connection_test : this.connection;
  }

  public static async cleanAll(entities: any) {
    try {
      for (const entity of entities) {
        const repository = await getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName};`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }
}
