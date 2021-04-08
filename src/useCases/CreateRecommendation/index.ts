import { Connection } from "typeorm";
import { PostgresUserRepository } from "../../infrastructure/postgres-user-repository";
import { CreateRecommendationController } from "./create-recommendation-controller";
import { CreateRecommendationUseCase } from "./create-recommendation-use-case";

interface IBuildResult {
  createRecommendationController: CreateRecommendationController;
}

export class createRecommendationUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
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
