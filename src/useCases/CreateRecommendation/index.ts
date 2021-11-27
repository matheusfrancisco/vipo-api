import RecommendationRepositoryFactory from "@infrastructure/database/factories/recommendation-repository-factory";
import RecommendationRequestsRepositoryFactory from "@infrastructure/database/factories/recommendation-requests-repository-factory";
import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import makeRecommendationProvider from "@providers/RecommendationProvider";
import { CreateRecommendationController } from "./create-recommendation-controller";
import { CreateRecommendationUseCase } from "./create-recommendation-use-case";

interface IBuildResult {
  createRecommendationController: CreateRecommendationController;
}

export class CreateRecommendationUseCaseFactory {
  public static build(): IBuildResult {
    const userRepository = UsersRepositoryFactory.make();
    const recommendationRequestsRepository = RecommendationRequestsRepositoryFactory.make();
    const recommendationRepository = RecommendationRepositoryFactory.make();
    const recommendationProvider = makeRecommendationProvider();
    const createRecommendationUseCase = new CreateRecommendationUseCase(
      userRepository,
      recommendationRequestsRepository,
      recommendationProvider,
      recommendationRepository
    );
    const createRecommendationController = new CreateRecommendationController(
      createRecommendationUseCase
    );
    return {
      createRecommendationController
    };
  }
}
