import RecommendationRequestsRepositoryFactory from "@infrastructure/database/factories/recommendation-requests-repository-factory";
import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import { CreateRecommendationController } from "./create-recommendation-controller";
import { CreateRecommendationUseCase } from "./create-recommendation-use-case";

interface IBuildResult {
  createRecommendationController: CreateRecommendationController;
}

export class CreateRecommendationUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = new PostgresUserRepository();
    const recommendationRequestsRepository = RecommendationRequestsRepositoryFactory.make();

    const createRecommendationUseCase = new CreateRecommendationUseCase(
      userRepository,
      recommendationRequestsRepository
    );
    const createRecommendationController = new CreateRecommendationController(
      createRecommendationUseCase
    );
    return {
      createRecommendationController
    };
  }
}
