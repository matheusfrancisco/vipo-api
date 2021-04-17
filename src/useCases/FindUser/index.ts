import { Connection } from "typeorm";
import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import { FindUserController } from "./find-user-controller";
import { FindUserUseCase } from "./find-user-use-case";

interface IBuild {
  findUserController: FindUserController;
  findUseCases: FindUserUseCase;
}

export class FindUseCaseFactory {
  public static build(connection: Connection): IBuild {
    const userRepository = new PostgresUserRepository();

    const findUseCases = new FindUserUseCase(userRepository);

    const findUserController = new FindUserController(findUseCases);

    return {
      findUserController,
      findUseCases
    };
  }
}
