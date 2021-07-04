import { IEntityId } from "@domain/global";

export default class EstablishmentFeedback {
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
  }: EstablishmentFeedback) {
    this.userId = userId;
    this.establishmentId = establishmentId;
    this.rating = rating;
    this.bestRatedItem = bestRatedItem;
    this.leastRatedItem = leastRatedItem;
    this.comments = comments;
  }
}
