import { ServiceError } from "@errors/service-error";
import IRecommendationRequestsRepository from "@domain/recommendation-request/IRecommendationRequestsRepository";
import RecommendationRequest from "@domain/recommendation-request/recommendation-request";
import ICreateRecommendationDTO from "@useCases/CreateRecommendation/create-recommendation-dto";
import IUserRepository from "@domain/user/IUserRepository";
import {
  IRecommedationData,
  IRecommendationProvider
} from "@providers/RecommendationProvider/models/IRecommendationProvider";

export class CreateRecommendationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private recommendationRequestsRepository: IRecommendationRequestsRepository,
    private recommendationProvider: IRecommendationProvider
  ) {}

  async execute({
    email,
    numberOfPeople,
    howMuch,
    like
  }: ICreateRecommendationDTO): Promise<IRecommedationData[]> {
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

    await this.recommendationRequestsRepository.save(request);

    const recommendations = await this.recommendationProvider.getRecommendations(
      request.toRecommendationPayload()
    );
    // #TODO save on database
    console.log(recommendations);
    return recommendations;
  }
}
