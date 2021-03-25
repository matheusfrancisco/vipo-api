import { Connection } from "typeorm";
import { PostgresUserRepository } from "../../infrastructure/postgres-user-repository";
import { FindUserController } from "./find-user-controller";
import { FindUserUseCase } from "./find-user-use-case";

export class FindUseCaseFactory {
  public static async build(connection: Connection) {
    const userRepository = new PostgresUserRepository(connection);

    const findUseCases = new FindUserUseCase(userRepository);

    const findUserController = new FindUserController(findUseCases);
    return {
      findUserController,
      findUseCases
    };
  }
}
