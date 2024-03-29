import EstablishmentFeedback from "@domain/establishment-feedback/establishment-feedback";
import IEstablishmentFeedback from "@domain/establishment-feedback/IEstablishmentFeedback";
import IEstablishmentFeedbacksRepository from "@domain/establishment-feedback/IEstablishmentFeedbacksRepository";
import { RepositoryError } from "@errors/repository-error";
import { UserFeedback } from "@infrastructure/database/entity/user-feedback";
import { getRepository } from "typeorm";

export default class PostgresEstablishmentFeedbacksRepository
  implements IEstablishmentFeedbacksRepository {
  private repository = getRepository(UserFeedback);

  public async create({
    userId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments,
    establishmentId
  }: EstablishmentFeedback): Promise<IEstablishmentFeedback> {
    try {
      const newFeedback = this.repository.create({
        userId,
        rating,
        bestRatedItem,
        leastRatedItem,
        comments,
        establishmentId
      });

      return this.repository.save(newFeedback);
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }
}
