import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import { FindUserController } from "./find-user-controller";
import { FindUserUseCase } from "./find-user-use-case";

interface IBuild {
  findUserController: FindUserController;
  findUseCases: FindUserUseCase;
}

export class FindUseCaseFactory {
  public static build(): IBuild {
    const userRepository = UsersRepositoryFactory.make();

    const findUseCases = new FindUserUseCase(userRepository);

    const findUserController = new FindUserController(findUseCases);

    return {
      findUserController,
      findUseCases
    };
  }
}
