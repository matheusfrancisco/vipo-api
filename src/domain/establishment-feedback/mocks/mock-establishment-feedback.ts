import { IEstablishmentFeedbackArgs } from "@domain/establishment-feedback/establishment-feedback";
import { IEntityId } from "@domain/global";
import faker from "faker";

const MAX_RANDOM_NUMBER = 50;
const MAX_RATING = 5;

export default class MockEstablishmentFeedback
  implements IEstablishmentFeedbackArgs {
  public userId: IEntityId;

  public establishmentId: IEntityId;

  public rating: number;

  public bestRatedItem: string;

  public leastRatedItem: string;

  public comments?: string;

  constructor({
    userId,
    establishmentId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments
  }: Partial<IEstablishmentFeedbackArgs> = {}) {
    this.userId = userId || faker.random.number(MAX_RANDOM_NUMBER);
    this.establishmentId =
      establishmentId || faker.random.number(MAX_RANDOM_NUMBER);
    this.rating = rating || faker.random.number(MAX_RATING);
    this.bestRatedItem = bestRatedItem || faker.random.word();
    this.leastRatedItem = leastRatedItem || faker.random.word();
    this.comments = comments;
  }
}
