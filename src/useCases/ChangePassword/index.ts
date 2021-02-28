import { Connection } from "typeorm";
import { PostgresUserRepository } from "@infrastructure/postgres-user-repository";
import makeHashProvider from "@providers/HashProvider";
import { FindUserUseCase } from "@useCases/FindUser/find-user-use-case";
import { ChangePasswordController } from "./change-password-controller";
import { ChangePasswordUseCase } from "./change-password-use-case";

interface IBuildResult {
  changePasswordController: ChangePasswordController;
}

export class ChangePasswordUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
    const userRepository = new PostgresUserRepository(connection);
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
