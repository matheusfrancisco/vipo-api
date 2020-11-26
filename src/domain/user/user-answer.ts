export interface IUserAnswer {
  userId: number;
  numberOfPeople: number;
  howMuch: number;
  places: string[];
}

export default class UserAnswer {
  private _userId: number;
  private _numberOfPeople?: number;
  private _howMuch?: number;
  private _places?: string[];

  constructor({ userId, numberOfPeople, howMuch, places }: IUserAnswer) {
    this._userId = userId;
    this._numberOfPeople = numberOfPeople;
    this._howMuch = howMuch;
    this._places = places;
  }

  public toRepository() {
    return {
      userId: this._userId,
      numberOfPeople: this._numberOfPeople,
      howMuch: this._howMuch,
      like: this._places,
    };
  }
}
