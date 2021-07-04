import { IEntityId } from "@domain/global";
import IUser from "@domain/user/IUser";

export default interface IProfile {
  id: IEntityId;
  musicals: string[];
  foods: string[];
  drinks: string[];
  user: IUser;
}
