import EstablishmentFeedbacksRepositoryFactory from "@infrastructure/database/factories/establishment-feedbacks-repository-factory";
import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import { ReceiveFeedbackController } from "@useCases/ReceiveFeedback/receive-feedback-controller";
import { ReceiveFeedbackUseCase } from "@useCases/ReceiveFeedback/receive-feedback-use-case";

interface IBuildResult {
  receiveFeedbackController: ReceiveFeedbackController;
}

export class ReceiveFeedbackUseCaseFactory {
  public static build(): IBuildResult {
    const usersRepository = UsersRepositoryFactory.make();
    const establishmentFeedbacksRepository = EstablishmentFeedbacksRepositoryFactory.make();

    const receiveFeedbackUseCase = new ReceiveFeedbackUseCase(
      usersRepository,
      establishmentFeedbacksRepository
    );

    const receiveFeedbackController = new ReceiveFeedbackController(
      receiveFeedbackUseCase
    );

    return { receiveFeedbackController };
  }
}
