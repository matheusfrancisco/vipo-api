import IRecommendationRequestsRepository from "@domain/recommendation-request/IRecommendationRequestsRepository";
import PostgresRecommendationRequestsRepository from "@infrastructure/database/repositories/postgres-recommendation-requests-repository";

export default class RecommendationRequestsRepositoryFactory {
  public static make(): IRecommendationRequestsRepository {
    return new PostgresRecommendationRequestsRepository();
  }
}
