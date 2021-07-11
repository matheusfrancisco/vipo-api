import makeHashProvider from "@providers/HashProvider";
import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-user-use-case";

interface IBuildResult {
  createUserController: CreateUserController;
}

export class CreateUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = UsersRepositoryFactory.make();
    const hashProvider = makeHashProvider();

    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      hashProvider
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return {
      createUserController
    };
  }
}
