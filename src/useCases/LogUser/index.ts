import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import makeHashProvider from "@providers/HashProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { LogUserController } from "@useCases/LogUser/log-user-controller";
import { LogUserUseCase } from "@useCases/LogUser/log-user-use-case";
import { Connection } from "typeorm";

interface IBuildResult {
  logUserController: LogUserController;
}

export class LogUserUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
    const usersRepository = new PostgresUserRepository(connection);
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
