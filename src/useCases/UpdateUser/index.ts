import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import { UpdateUserController } from "@useCases/UpdateUser/update-user-controller";
import { UpdateUserUseCase } from "@useCases/UpdateUser/update-user-use-case";

interface IBuildResult {
  updateUserController: UpdateUserController;
}

export class UpdateUserUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = UsersRepositoryFactory.make();
    const updateUseCases = new UpdateUserUseCase(userRepository);

    const updateUserController = new UpdateUserController(updateUseCases);
    return {
      updateUserController
    };
  }
}
