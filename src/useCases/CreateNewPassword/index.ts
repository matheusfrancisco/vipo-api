import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import makeHashProvider from "@providers/HashProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { CreateNewPasswordController } from "@useCases/CreateNewPassword/create-new-password-controller";
import { CreateNewPasswordUseCase } from "@useCases/CreateNewPassword/create-new-password-use-case";
import { Connection } from "typeorm";

interface IBuildResult {
  createNewPasswordController: CreateNewPasswordController;
}

export class CreateNewPasswordUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
    const usersRepository = new PostgresUserRepository();
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
