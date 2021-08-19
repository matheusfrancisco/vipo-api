import { IEntityId } from "@domain/global";
import { IUserData } from "@domain/user/IUser";

export default interface IEstablishmentFeedback {
  userId: IEntityId;
  user: IUserData;
  establishmentId: IEntityId;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}
