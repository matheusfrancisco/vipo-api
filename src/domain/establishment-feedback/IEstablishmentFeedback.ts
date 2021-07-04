import { IEntityId } from "@domain/global";
import IUser from "@domain/user/IUser";

export default interface IEstablishmentFeedback {
  userId: IEntityId;
  user: IUser;
  establishmentId: IEntityId;
  rating: number;
  bestRatedItem: string;
  leastRatedItem: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}
