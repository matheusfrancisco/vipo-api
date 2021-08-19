import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import makeHashProvider from "@providers/HashProvider";
import { FindUserUseCase } from "@useCases/FindUser/find-user-use-case";
import { ChangePasswordController } from "./change-password-controller";
import { ChangePasswordUseCase } from "./change-password-use-case";

interface IBuildResult {
  changePasswordController: ChangePasswordController;
}

export class ChangePasswordUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = UsersRepositoryFactory.make();
    const hashProvider = makeHashProvider();

    const changePasswordUseCase = new ChangePasswordUseCase(
      userRepository,
      hashProvider
    );
    const findUseCase = new FindUserUseCase(userRepository);

    const changePasswordController = new ChangePasswordController(
      changePasswordUseCase,
      findUseCase
    );

    return { changePasswordController };
  }
}
