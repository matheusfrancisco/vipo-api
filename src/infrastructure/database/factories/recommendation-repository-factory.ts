import { IRecommendationRepository } from "@domain/recommendation/recommendation";
import PostgresRecommendationRepository from "../repositories/postgres-recommendation";

export default class RecommendationRepositoryFactory {
  public static make(): IRecommendationRepository {
    return new PostgresRecommendationRepository();
  }
}
