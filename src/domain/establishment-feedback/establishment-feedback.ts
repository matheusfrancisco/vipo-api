import { IEntityId } from "@domain/global";

export interface IEstablishmentFeedbackArgs {
  userId: IEntityId;
  establishmentId: IEntityId;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
}

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
  }: IEstablishmentFeedbackArgs) {
    this.userId = userId;
    this.establishmentId = establishmentId;
    this.rating = rating;
    this.bestRatedItem = bestRatedItem;
    this.leastRatedItem = leastRatedItem;
    this.comments = comments;
  }
}
