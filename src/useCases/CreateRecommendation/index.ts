import { PostgresUserRepository } from "../../infrastructure/postgres-user-repository";
import { CreateRecommendationController } from "./create-recommendation-controller";
import { Connection, createConnection } from "typeorm";
import { CreateRecommendationUseCase } from "../CreateRecommendation/create-recommendation-use-case";
import { UserRepository } from "src/domain/user/user-repository";

export class createRecommendationUseCaseFactory {
  public static async build(connection: Connection) {
    let userRepository: UserRepository;

    userRepository = new PostgresUserRepository(connection);

    const createRecommendationUseCase = new CreateRecommendationUseCase(
      userRepository
    );
    const createRecommendationController = new CreateRecommendationController(
      createRecommendationUseCase
    );
    return {
      createRecommendationController,
    };
  }
}
