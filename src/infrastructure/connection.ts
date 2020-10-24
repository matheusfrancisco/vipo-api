import { Connection, createConnection } from "typeorm";

export class CreateDatabaseConnection {
  private static connection: Connection;

  public static async createConnection() {
    if (!this.connection) {
      this.connection = await createConnection();
    }
    return this.connection;
  }

  public static getConnection() {
    this.connection;
  }
}
