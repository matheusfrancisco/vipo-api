import { PostgresCustomerRepository } from "../../infrastructure/postgres-customer-repository";
import { CreateUserController } from "./create-user-controller";
import { Connection, createConnection } from "typeorm";
import { CustomerRepository } from "../../domain/user/user-repository";
import { CreateUserUseCase } from "./create-use-case";

export class createUseCaseFactory {
  private static connection: Connection;

  public static async build(config: string = "prod") {
    let userRepository: CustomerRepository;

    userRepository = new PostgresCustomerRepository(
      await this.createConnection()
    );

    const createUserUseCase = new CreateUserUseCase(userRepository);

    const userController = new CreateUserController(createUserUseCase);
    return {
      userController,
      userRepository
    };
  }

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
