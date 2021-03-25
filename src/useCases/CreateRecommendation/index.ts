import { Connection } from "typeorm";
import { PostgresUserRepository } from "../../infrastructure/postgres-user-repository";
import { CreateRecommendationController } from "./create-recommendation-controller";
import { CreateRecommendationUseCase } from "./create-recommendation-use-case";

export class createRecommendationUseCaseFactory {
  public static async build(connection: Connection) {
    const userRepository = new PostgresUserRepository(connection);

    const createRecommendationUseCase = new CreateRecommendationUseCase(
      userRepository
    );
    const createRecommendationController = new CreateRecommendationController(
      createRecommendationUseCase
    );
    return {
      createRecommendationController
    };
  }
}
