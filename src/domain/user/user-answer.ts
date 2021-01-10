export interface IUserAnswer {
  userId: number;
  numberOfPeople: number;
  howMuch: string;
  like: string[];
  recommendations?: Record<string, any>[];
}

export default class UserAnswer {
  private _userId: number;
  private _numberOfPeople: number;
  private _howMuch: string;
  private _like: string[];
  private _recommendations?: Record<string, any>[];

  constructor({ userId, numberOfPeople, howMuch, recommendations, like }: IUserAnswer) {
    this._userId = userId;
    this._numberOfPeople = numberOfPeople;
    this._howMuch = howMuch;
    this._like = like;
    this._recommendations = recommendations;
  }

  public addRecommendation(recommendations: Record<string, any>[]) {
    this._recommendations = recommendations;
  }

  public toRepository() {
    return {
      userId: this._userId,
      numberOfPeople: this._numberOfPeople,
      howMuch: this._howMuch,
      like: this._like,
      recommendations: this._recommendations,
    };
  }
}
