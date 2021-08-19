import RecommendationRequestsRepositoryFactory from "@infrastructure/database/factories/recommendation-requests-repository-factory";
import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import { CreateRecommendationController } from "./create-recommendation-controller";
import { CreateRecommendationUseCase } from "./create-recommendation-use-case";

interface IBuildResult {
  createRecommendationController: CreateRecommendationController;
}

export class CreateRecommendationUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = UsersRepositoryFactory.make();
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
