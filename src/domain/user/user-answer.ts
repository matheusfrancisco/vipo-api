export interface IUserAnswer {
  userId: number;
  numberOfPeople: number;
  howMuch: number;
  like: string;
}

export default class UserAnswer {
  private _userId: number;
  private _numberOfPeople?: number;
  private _howMuch?: number;
  private _like?: string;

  constructor({ userId, numberOfPeople, howMuch, like }: IUserAnswer) {
    this._userId = userId;
    this._numberOfPeople = numberOfPeople;
    this._howMuch = howMuch;
    this._like = like;
  }

  public toRepository() {
    return {
      userId: this._userId,
      numberOfPeople: this._numberOfPeople,
      howMuch: this._howMuch,
      like: this._like,
    };
  }
}
