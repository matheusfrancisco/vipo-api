import { Connection } from "typeorm";
import makeHashProvider from "@providers/HashProvider";
import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import { IUserRepository } from "@domain/user/user-repository";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-use-case";

interface IBuildResult {
  userRepository: IUserRepository;
  createUserController: CreateUserController;
}

export class CreateUseCaseFactory {
  public static async build(connection: Connection): Promise<IBuildResult> {
    const userRepository = new PostgresUserRepository(connection);
    const hashProvider = makeHashProvider();

    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      hashProvider
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return {
      createUserController,
      userRepository
    };
  }
}
