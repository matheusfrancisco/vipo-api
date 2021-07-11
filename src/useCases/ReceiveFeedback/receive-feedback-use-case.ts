import EstablishmentFeedback from "@domain/establishment-feedback/establishment-feedback";
import IEstablishmentRepositoriesFeedback from "@domain/establishment-feedback/IEstablishmentFeedbacksRepository";
import IUserRepository from "@domain/user/IUserRepository";
import { ServiceError } from "@errors/service-error";
import IReceiveFeedbackDTO from "@useCases/ReceiveFeedback/receive-feedback-dto";

export class ReceiveFeedbackUseCase {
  constructor(
    private userRepository: IUserRepository,
    private establishmentFeedbacks: IEstablishmentRepositoriesFeedback
  ) {}

  public async execute({
    email,
    establishmentId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments
  }: IReceiveFeedbackDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ServiceError("User does not exist", 404);

    const feedback = new EstablishmentFeedback({
      userId: user.id,
      establishmentId,
      rating,
      bestRatedItem,
      leastRatedItem,
      comments
    });

    await this.establishmentFeedbacks.create(feedback);
  }
}
