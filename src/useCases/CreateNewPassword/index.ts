import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import makeHashProvider from "@providers/HashProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { CreateNewPasswordController } from "@useCases/CreateNewPassword/create-new-password-controller";
import { CreateNewPasswordUseCase } from "@useCases/CreateNewPassword/create-new-password-use-case";

interface IBuildResult {
  createNewPasswordController: CreateNewPasswordController;
}

export class CreateNewPasswordUseCaseFactory {
  public static build(): IBuildResult {
    const usersRepository = UsersRepositoryFactory.make();
    const tokenProvider = makeTokenProvider();
    const hashProvider = makeHashProvider();

    const createNewPasswordUseCase = new CreateNewPasswordUseCase(
      usersRepository,
      tokenProvider,
      hashProvider
    );

    const createNewPasswordController = new CreateNewPasswordController(
      createNewPasswordUseCase
    );

    return { createNewPasswordController };
  }
}
