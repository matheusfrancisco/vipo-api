import IRecommendationRequest from "@domain/recommendation-request/IRecommendationRequest";
import IRecommendationRequestsRepository from "@domain/recommendation-request/IRecommendationRequestsRepository";
import RecommendationRequest from "@domain/recommendation-request/recommendation-request";
import { UserAnswer } from "@infrastructure/database/entity/user-answer";
import { getRepository } from "typeorm";

export default class PostgresRecommendationRequestsRepository
  implements IRecommendationRequestsRepository {
  private repository = getRepository(UserAnswer);

  public async save({
    userId,
    like,
    howMuch,
    numberOfPeople
  }: RecommendationRequest): Promise<IRecommendationRequest> {
    const request = this.repository.create({
      userId,
      like,
      howMuch,
      numberOfPeople
    });

    return this.repository.save(request);
  }
}
