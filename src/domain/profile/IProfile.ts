import { IEntityId } from "@domain/global";
import { IUserData } from "@domain/user/IUser";

export default interface IProfile {
  id: IEntityId;
  musicals: string[];
  foods: string[];
  drinks: string[];
  user: IUserData;
}
