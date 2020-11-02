import { PostgresUserRepository } from "../../infrastructure/postgres-user-repository";
import { CreateUserController } from "./create-user-controller";
import { Connection, createConnection } from "typeorm";
import { UserRepository } from "../../domain/user/user-repository";
import { CreateUserUseCase } from "./create-use-case";

export class createUseCaseFactory {
  public static async build(connection: Connection) {
    let userRepository: UserRepository;

    userRepository = new PostgresUserRepository(connection);

    const createUserUseCase = new CreateUserUseCase(userRepository);

    const createUserController = new CreateUserController(createUserUseCase);
    return {
      createUserController,
      userRepository
    };
  }
}
