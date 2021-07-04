import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import ProfilesRepositoryFactory from "@infrastructure/database/factories/ProfilesRepositoryFactory";
import { UpdateUserProfileUseCase } from "./update-user-profile-use-case";
import { UpdateUserProfileController } from "./update-user-profile-controller";
import { FindUserUseCase } from "../FindUser/find-user-use-case";

interface IBuild {
  updateUserProfileController: UpdateUserProfileController;
}

export class UpdateUserProfileUseCaseFactory {
  public static build(): IBuild {
    const userRepository = new PostgresUserRepository();
    const profilesRepository = ProfilesRepositoryFactory.make();
    const updateUseCases = new UpdateUserProfileUseCase(profilesRepository);
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
