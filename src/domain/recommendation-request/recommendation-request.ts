import { IEntityId } from "@domain/global";

export interface IRecommendationRequestArgs {
  userId: IEntityId;
  numberOfPeople: number;
  howMuch: string;
  like: string[];
}

export default class RecommendationRequest {
  public userId: IEntityId;

  public numberOfPeople: number;

  public howMuch: string;

  public like: string[];

  constructor({
    userId,
    numberOfPeople,
    howMuch,
    like
  }: IRecommendationRequestArgs) {
    this.userId = userId;
    this.numberOfPeople = numberOfPeople;
    this.howMuch = howMuch;
    this.like = like;
  }
}
