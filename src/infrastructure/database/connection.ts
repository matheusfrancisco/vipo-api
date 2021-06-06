import {
  Connection,
  createConnection,
  getConnection,
  getRepository
} from "typeorm";

export class CreateDatabaseConnection {
  public static connection: Connection;

  public static async createConnection(): Promise<Connection> {
    if (!this.connection) this.connection = await createConnection();

    return this.connection;
  }

  public static async getConnection(): Promise<Connection | undefined> {
    return getConnection();
  }

  public static async cleanAll(): Promise<void> {
    try {
      const connection = getConnection();

      if (!connection) throw new Error("There are no active connections");

      const entities = connection.entityMetadatas;

      entities.forEach(async entity => {
        const repository = getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName};`);
      });
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  public static async endConnection(): Promise<void> {
    const connection = getConnection();

    await connection.close();
  }
}
