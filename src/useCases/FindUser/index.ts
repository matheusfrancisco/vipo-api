import { PostgresCustomerRepository } from "../../infrastructure/postgres-customer-repository";
import { FindUserController } from "./find-user-controller";
import { Connection, createConnection } from "typeorm";
import { CustomerRepository } from "../../domain/user/user-repository";
import { FindUserUseCase } from "./find-user-use-case";

export class FindUseCaseFactory {
  public static async build(connection: Connection) {
    let userRepository: CustomerRepository;

    userRepository = new PostgresCustomerRepository(connection);

    const findUseCases = new FindUserUseCase(userRepository);

    const findUserController = new FindUserController(findUseCases);
    return {
      findUserController,
      findUseCases,
    };
  }
}
