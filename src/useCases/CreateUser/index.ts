import { PostgresCustomerRepository } from "../../infrastructure/postgres-customer-repository";
import { CreateUserController } from "./create-user-controller";
import { Connection, createConnection } from "typeorm";
import { CustomerRepository } from "../../domain/user/user-repository";
import { CreateUserUseCase } from "./create-use-case";

export class createUseCaseFactory {
  public static async build(connection: Connection) {
    let userRepository: CustomerRepository;

    userRepository = new PostgresCustomerRepository(connection);

    const createUserUseCase = new CreateUserUseCase(userRepository);

    const createUserController = new CreateUserController(createUserUseCase);
    return {
      createUserController,
      userRepository
    };
  }
}
