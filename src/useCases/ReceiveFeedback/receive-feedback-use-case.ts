import EstablishmentFeedback from "@domain/establishment-feedback/establishment-feedback";
import IEstablishmentRepositoriesFeedback from "@domain/establishment-feedback/IEstablishmentFeedbacksRepository";
import { IUserRepository } from "@domain/user/user-repository";
import IReceiveFeedbackDTO from "@useCases/ReceiveFeedback/receive-feedback-dto";

export class ReceiveFeedbackUseCase {
  constructor(
    private userRepository: IUserRepository,
    private establishmentFeedbacks: IEstablishmentRepositoriesFeedback
  ) {}

  public async execute({
    userId,
    establishmentId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments
  }: IReceiveFeedbackDTO): Promise<void> {
    const feedback = new EstablishmentFeedback({
      userId,
      establishmentId,
      rating,
      bestRatedItem,
      leastRatedItem,
      comments
    });

    await this.establishmentFeedbacks.create(feedback);
  }
}
