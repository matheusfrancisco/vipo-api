import { ServiceError } from "@errors/service-error";
import IRecommendationRequestsRepository from "@domain/recommendation-request/IRecommendationRequestsRepository";
import RecommendationRequest from "@domain/recommendation-request/recommendation-request";
import ICreateRecommendationDTO from "@useCases/CreateRecommendation/create-recommendation-dto";
import IUserRepository from "@domain/user/IUserRepository";

interface IRecommendation {
  name: string;
  description: string;
}

export class CreateRecommendationUseCase {
  constructor(
    private userRepository: IUserRepository,
    private recommendationRequestsRepository: IRecommendationRequestsRepository
  ) {}

  async execute({
    email,
    numberOfPeople,
    howMuch,
    like
  }: ICreateRecommendationDTO): Promise<IRecommendation[]> {
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

    const recommendations = [
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" }
    ];

    return recommendations;
  }
}
