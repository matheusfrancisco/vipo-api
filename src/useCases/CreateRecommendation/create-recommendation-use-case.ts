import { ServiceError } from "@errors/service-error";
import IRecommendationRequestsRepository from "@domain/recommendation-request/IRecommendationRequestsRepository";
import RecommendationRequest from "@domain/recommendation-request/recommendation-request";
import ICreateRecommendationDTO from "@useCases/CreateRecommendation/create-recommendation-dto";
import IUserRepository from "@domain/user/IUserRepository";
import { IRecommendationProvider } from "@providers/RecommendationProvider/models/IRecommendationProvider";
import { toRepository } from "@infrastructure/adapters/recommendations";
import {
  IRecommendationRepository,
  IUserRecommendationData
} from "@domain/recommendation/recommendation";

export class CreateRecommendationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private recommendationRequestsRepository: IRecommendationRequestsRepository,
    private recommendationProvider: IRecommendationProvider,
    private recommendationRepository: IRecommendationRepository
  ) {}

  async execute({
    email,
    numberOfPeople,
    howMuch,
    like
  }: ICreateRecommendationDTO): Promise<IUserRecommendationData> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ServiceError("user_not_exist");
    }

    const request = new RecommendationRequest({
      userId: user.id,
      numberOfPeople,
      howMuch,
      like
    });

    const userAnswerRequested = await this.recommendationRequestsRepository.save(
      request
    );

    const recommendations = await this.recommendationProvider.getRecommendations(
      request.toRecommendationPayload()
    );
    const userRecommendation = await this.recommendationRepository.save({
      userId: user.id,
      userAnswer: userAnswerRequested.id,
      recommendations: toRepository(recommendations)
    });

    console.log(userRecommendation);
    return userRecommendation;
  }
}
