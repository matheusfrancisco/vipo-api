import { IEntityId } from "@domain/global";

export default class Profile {
  public user: IEntityId;

  public drinks: string[];

  public foods: string[];

  public musicals: string[];

  constructor({ user, drinks, foods, musicals }: Profile) {
    this.user = user;
    this.drinks = drinks;
    this.foods = foods;
    this.musicals = musicals;
  }
}
