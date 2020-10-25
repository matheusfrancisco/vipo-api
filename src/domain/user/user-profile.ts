export interface IUserProfile {
  userId: number;
  musicals: string[];
  foods: string[];
  drinks: string[];
}

export default class UserProfile{
  private _userId: number;
  private _musicals?: string[];
  private _foods?: string[];
  private _drinks?: string[];

  constructor({
    userId,
    musicals,
    foods,
    drinks,
  }: IUserProfile) {
    this._userId = userId;
    this._musicals = musicals;
    this._foods = foods;
    this._drinks = drinks;
  }

  public toRepository() {
    return {
      userId: this._userId,
      musicals: this._musicals,
      foods: this._foods,
      drinks: this._drinks,
    }
  }

}
