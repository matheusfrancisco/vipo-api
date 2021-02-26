import { IUser } from "./user";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface UserRepository {
  save: (user: IUser) => Promise<void>;
  findByEmail: (email: string) => Promise<UserEntity | void>;
  update: (user: any) => Promise<IUser>;
  updateUserProfile: (userProfile: any) => Promise<any>;
  insertAnswer: (userAnswer: any) => Promise<void>;
}
