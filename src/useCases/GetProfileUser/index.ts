import ProfilesRepositoryFactory from "@infrastructure/database/factories/profiles-repository-factory";
import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import { FindUserUseCase } from "@useCases/FindUser/find-user-use-case";
import { ProfileUserController } from "./profile-user-controller";
import { ProfileUserUseCase } from "./profile-user-use-case";

interface IBuildResult {
  profileUserController: ProfileUserController;
}

export class GetProfileUserUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = UsersRepositoryFactory.make();
    const profilesRepository = ProfilesRepositoryFactory.make();

    const profileUserUseCase = new ProfileUserUseCase(
      userRepository,
      profilesRepository
    );
    const findUseCase = new FindUserUseCase(userRepository);

    const profileUserController = new ProfileUserController(
      profileUserUseCase,
      findUseCase
    );

    return { profileUserController };
  }
}
