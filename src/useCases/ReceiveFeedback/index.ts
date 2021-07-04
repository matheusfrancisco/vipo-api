import EstablishmentFeedbacksRepositoryFactory from "@infrastructure/database/factories/establishment-feedbacks-repository-factory";
import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import { ReceiveFeedbackController } from "@useCases/ReceiveFeedback/receive-feedback-controller";
import { ReceiveFeedbackUseCase } from "@useCases/ReceiveFeedback/receive-feedback-use-case";

interface IBuildResult {
  receiveFeedbackController: ReceiveFeedbackController;
}

export class ReceiveFeedbackUseCaseFactory {
  public static build(): IBuildResult {
    const usersRepository = new PostgresUserRepository();
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
