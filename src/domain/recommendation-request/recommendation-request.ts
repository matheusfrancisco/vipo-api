export default class RecommendationRequest {
  public userId: string;

  public numberOfPeople: number;

  public howMuch: string;

  public like: string[];

  constructor({
    userId,
    numberOfPeople,
    howMuch,
    like
  }: RecommendationRequest) {
    this.userId = userId;
    this.numberOfPeople = numberOfPeople;
    this.howMuch = howMuch;
    this.like = like;
  }
}
