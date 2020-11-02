import { PostgresCustomerRepository } from "../../infrastructure/postgres-customer-repository";
import { UpdateUserProfileUseCase } from "./update-user-profile-use-case";
import { Connection, createConnection } from "typeorm";
import { CustomerRepository } from "../../domain/user/user-repository";
import { UpdateUserProfileController } from "./update-user-profile-controller";
import { FindUserUseCase } from '../FindUser/find-user-use-case';

export class UpdateUserUseCaseFactory {
  public static async build(
    connection: Connection,
  ) {
    let userRepository: CustomerRepository;

    userRepository = new PostgresCustomerRepository(connection);
    const updateUseCases = new UpdateUserProfileUseCase(userRepository)
    const findUseCases = new FindUserUseCase(userRepository);

    const updateUserProfileController = new UpdateUserProfileController(
      updateUseCases,
      findUseCases,
    );
    return {
        updateUserProfileController
    };
  }
}
