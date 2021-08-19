import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import makeHashProvider from "@providers/HashProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { LogUserController } from "@useCases/LogUser/log-user-controller";
import { LogUserUseCase } from "@useCases/LogUser/log-user-use-case";

interface IBuildResult {
  logUserController: LogUserController;
}

export class LogUserUseCaseFactory {
  public static build(): IBuildResult {
    const usersRepository = UsersRepositoryFactory.make();
    const hashProvider = makeHashProvider();
    const tokenProvider = makeTokenProvider();

    const logUserUseCase = new LogUserUseCase(
      usersRepository,
      tokenProvider,
      hashProvider
    );

    const logUserController = new LogUserController(logUserUseCase);

    return { logUserController };
  }
}
