import {
  IRecommendationRepository,
  IUserRecommendationData
} from "@domain/recommendation/recommendation";
import { RepositoryError } from "@errors/repository-error";
import { getRepository } from "typeorm";
import { UserRecommendation } from "../entity/user-recommendation";

export default class PostgresRecommendationRepository
  implements IRecommendationRepository {
  private repository = getRepository(UserRecommendation);

  public async save({
    userId,
    recommendations,
    userAnswer
  }: UserRecommendation): Promise<IUserRecommendationData> {
    try {
      const userRecommendation = this.repository.create({
        userId,
        recommendations,
        userAnswer
      });

      return this.repository.save(userRecommendation);
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }
}
