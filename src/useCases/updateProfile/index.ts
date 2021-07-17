import ProfilesRepositoryFactory from "@infrastructure/database/factories/profiles-repository-factory";
import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import { UpdateUserProfileUseCase } from "./update-user-profile-use-case";
import { UpdateUserProfileController } from "./update-user-profile-controller";
import { FindUserUseCase } from "../FindUser/find-user-use-case";

interface IBuild {
  updateUserProfileController: UpdateUserProfileController;
}

export class UpdateUserProfileUseCaseFactory {
  public static build(): IBuild {
    const userRepository = UsersRepositoryFactory.make();
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
