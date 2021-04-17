import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import { UpdateUserController } from "@useCases/UpdateUser/update-user-controller";
import { UpdateUserUseCase } from "@useCases/UpdateUser/update-user-use-case";

interface IBuildResult {
  updateUserController: UpdateUserController;
}

export class UpdateUserUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = new PostgresUserRepository();
    const updateUseCases = new UpdateUserUseCase(userRepository);

    const updateUserController = new UpdateUserController(updateUseCases);
    return {
      updateUserController
    };
  }
}
