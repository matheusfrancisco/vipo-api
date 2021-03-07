import { IUser } from "./user";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface IUserRepositoryUpdatePayload {
  userId: number;
  name?: string;
  lastName?: string;
  password?: string;
}

export interface UserRepository {
  save: (user: IUser) => Promise<void>;
  findByEmail: (email: string) => Promise<UserEntity | undefined | null>;
  update: (user: IUserRepositoryUpdatePayload) => Promise<IUser>;
  updateUserProfile: (userProfile: any) => Promise<any>;
  insertAnswer: (userAnswer: any) => Promise<void>;
  // #TODO not implemented yet
  findAllProfileInformationsByEmail: (email: string) => Promise<void>;
}
