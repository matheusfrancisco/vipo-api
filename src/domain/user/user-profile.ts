export interface IUserProfile {
  user: number;
  musicals: string[];
  foods: string[];
  drinks: string[];
}

export default class UserProfile {
  private _user: number;

  private _musicals: string[];

  private _foods: string[];

  private _drinks: string[];

  constructor({ user, musicals, foods, drinks }: IUserProfile) {
    this._user = user;
    this._musicals = musicals;
    this._foods = foods;
    this._drinks = drinks;
  }

  public toRepository(): IUserProfile {
    return {
      user: this._user,
      musicals: this._musicals,
      foods: this._foods,
      drinks: this._drinks
    };
  }
}
