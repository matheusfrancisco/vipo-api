import { IUserProfile } from "@domain/user/user-profile";
import { IUser } from "./user";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface IUserRepositoryUpdatePayload {
  userId: number;
  name?: string;
  lastName?: string;
  password?: string;
}

export interface IUserRepository {
  save: (user: IUser) => Promise<Omit<IUser, "password">>;
  findByEmail: (email: string) => Promise<UserEntity | undefined | null>;
  update: (user: IUserRepositoryUpdatePayload) => Promise<IUser>;
  updateUserProfile: (userProfile: any) => Promise<any>;
  insertAnswer: (userAnswer: any) => Promise<void>;
  findUserProfile: (user: number) => Promise<IUserProfile | undefined>;
}
