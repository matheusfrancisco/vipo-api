import IEstablishmentRepositoriesFeedback from "@domain/establishment-feedback/IEstablishmentFeedbacksRepository";
import PostgresEstablishmentFeedbacksRepository from "@infrastructure/database/repositories/postgres-establishment-feedbacks-repository";

export default class EstablishmentFeedbacksRepositoryFactory {
  public static make(): IEstablishmentRepositoriesFeedback {
    return new PostgresEstablishmentFeedbacksRepository();
  }
}
