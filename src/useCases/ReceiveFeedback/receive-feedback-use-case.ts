import { IUserRepository } from "@domain/user/user-repository";
import IReceiveFeedbackDTO from "@useCases/ReceiveFeedback/receive-feedback-dto";

export class ReceiveFeedbackUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({
    userId,
    venueId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments
  }: IReceiveFeedbackDTO): Promise<void> {
    await this.userRepository.receiveFeedback({
      userId,
      venueId,
      rating,
      bestRatedItem,
      leastRatedItem,
      comments
    });
  }
}
