import { IUserData } from "@domain/user/IUser";

export default interface IRecommendationRequest {
  user: IUserData;
  numberOfPeople: number;
  howMuch: string;
  like: string[];
}
