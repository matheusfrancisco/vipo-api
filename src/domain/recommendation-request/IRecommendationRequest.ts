import IUser from "@domain/user/IUser";

export default interface IRecommendationRequest {
  user: IUser;
  numberOfPeople: number;
  howMuch: string;
  like: string[];
}
