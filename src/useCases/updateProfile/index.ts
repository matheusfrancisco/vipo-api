import { Connection } from "typeorm";
import { PostgresUserRepository } from "../../infrastructure/postgres-user-repository";
import { UpdateUserProfileUseCase } from "./update-user-profile-use-case";
import { UpdateUserProfileController } from "./update-user-profile-controller";
import { FindUserUseCase } from "../FindUser/find-user-use-case";

export class UpdateUserProfileUseCaseFactory {
  public static async build(connection: Connection) {
    const userRepository = new PostgresUserRepository(connection);
    const updateUseCases = new UpdateUserProfileUseCase(userRepository);
    const findUseCases = new FindUserUseCase(userRepository);

    const updateUserProfileController = new UpdateUserProfileController(
      updateUseCases,
      findUseCases
    );
    return {
      updateUserProfileController
    };
  }
}
