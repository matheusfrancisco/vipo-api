import { PostgresUserRepository } from "src/infrastructure/postgres-user-repository";
import { Connection } from "typeorm";
import { UpdateUserController } from "./update-user-controller";
import { UpdateUserUseCase } from "./update-user-use-case";

interface IBuildResult {
  updateUserController: UpdateUserController;
}

export class UpdateUserUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
    const userRepository = new PostgresUserRepository(connection);
    const updateUseCases = new UpdateUserUseCase(userRepository);

    const updateUserController = new UpdateUserController(updateUseCases);
    return {
      updateUserController
    };
  }
}
