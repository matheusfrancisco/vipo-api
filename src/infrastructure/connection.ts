import {
  Connection,
  createConnection,
  EntityMetadata,
  getRepository
} from "typeorm";
import databaseConfig from "./database";

export class CreateDatabaseConnection {
  public static async createConnection(): Promise<Connection> {
    const connection = await createConnection();

    return connection;
  }

  public static async cleanAll(entities: EntityMetadata[]): Promise<void> {
    try {
      entities.forEach(async entity => {
        const repository = await getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName};`);
      });
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }
}
