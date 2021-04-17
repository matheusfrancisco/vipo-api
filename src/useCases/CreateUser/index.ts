import makeHashProvider from "@providers/HashProvider";
import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-use-case";

interface IBuildResult {
  createUserController: CreateUserController;
}

export class CreateUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = new PostgresUserRepository();
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
