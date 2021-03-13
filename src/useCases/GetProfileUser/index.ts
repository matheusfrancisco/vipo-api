import { Connection } from "typeorm";
import { PostgresUserRepository } from "@infrastructure/postgres-user-repository";
import { FindUserUseCase } from "@useCases/FindUser/find-user-use-case";
import { ProfileUserController } from "./profile-user-controller";
import { ProfileUserUseCase } from "./profile-user-use-case";

interface IBuildResult {
  profileUserController: ProfileUserController;
}

export class GetProfileUserUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
    const userRepository = new PostgresUserRepository(connection);

    const profileUserUseCase = new ProfileUserUseCase(userRepository);
    const findUseCase = new FindUserUseCase(userRepository);

    const profileUserController = new ProfileUserController(
      profileUserUseCase,
      findUseCase
    );

    return { profileUserController };
  }
}