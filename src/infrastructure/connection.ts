import {
  Connection,
  createConnection,
  EntityMetadata,
  getRepository
} from "typeorm";

export class CreateDatabaseConnection {
  public static connection: Connection
  public static async createConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await createConnection();
      return this.connection;
    } else {
      return this.connection;
    }
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
