export interface IUserAnswer {
  userId: number;
  numberOfPeople: number;
  howMuch: string;
  like: string[];
  recommendations?: Record<string, any>[];
}

export default class UserAnswer {
  private userId: number;

  private numberOfPeople: number;

  private howMuch: string;

  private like: string[];

  private recommendations?: Record<string, any>[];

  constructor({
    userId,
    numberOfPeople,
    howMuch,
    recommendations,
    like
  }: IUserAnswer) {
    this.userId = userId;
    this.numberOfPeople = numberOfPeople;
    this.howMuch = howMuch;
    this.like = like;
    this.recommendations = recommendations;
  }

  public addRecommendation(recommendations: Record<string, any>[]): void {
    this.recommendations = recommendations;
  }

  public toRepository(): IUserAnswer {
    return {
      userId: this.userId,
      numberOfPeople: this.numberOfPeople,
      howMuch: this.howMuch,
      like: this.like,
      recommendations: this.recommendations
    };
  }
}
