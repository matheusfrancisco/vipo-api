import { IEntityId } from "@domain/global";
import { IUserData } from "@domain/user/IUser";

export default interface IRecommendationRequest {
  id: IEntityId;
  user: IUserData;
  numberOfPeople: number;
  howMuch: string;
  like: string[];
}
