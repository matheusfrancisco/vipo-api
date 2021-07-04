import EstablishmentFeedback from "@domain/establishment-feedback/establishment-feedback";
import IEstablishmentFeedback from "@domain/establishment-feedback/IEstablishmentFeedback";
import IEstablishmentRepositoriesFeedback from "@domain/establishment-feedback/IEstablishmentFeedbacksRepository";
import { UserFeedback } from "@infrastructure/database/entity/user-feedback";
import { getRepository } from "typeorm";

export default class PostgresEstablishmentFeedbacksRepository
  implements IEstablishmentRepositoriesFeedback {
  private repository = getRepository(UserFeedback);

  public async create({
    userId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments,
    establishmentId
  }: EstablishmentFeedback): Promise<IEstablishmentFeedback> {
    const newFeedback = this.repository.create({
      userId,
      rating,
      bestRatedItem,
      leastRatedItem,
      comments,
      establishmentId
    });

    return this.repository.save(newFeedback);
  }
}
