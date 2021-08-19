import { IEntityId } from "@domain/global";

export interface IProfileArgs {
  id?: IEntityId;
  user: IEntityId;
  drinks: string[];
  foods: string[];
  musicals: string[];
}

export default class Profile {
  public id?: IEntityId;

  public user: IEntityId;

  public drinks: string[];

  public foods: string[];

  public musicals: string[];

  constructor({ id, user, drinks, foods, musicals }: IProfileArgs) {
    this.id = id;
    this.user = user;
    this.drinks = drinks;
    this.foods = foods;
    this.musicals = musicals;
  }
}
