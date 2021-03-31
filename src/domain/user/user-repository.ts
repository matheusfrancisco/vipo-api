import { IUserProfile } from "@domain/user/user-profile";
import { IUser } from "./user";
import { UserEntity } from "../../infrastructure/entity/user-entity";

export interface IUserRepositoryUpdatePayload {
  userId: number;
  name?: string;
  lastName?: string;
  password?: string;
}

export interface ISavedUser extends Omit<IUser, "password"> {
  id: number;
  createdAt: Date;
}

export interface IUserRepository {
  save: (user: IUser) => Promise<ISavedUser>;
  findByEmail: (email: string) => Promise<UserEntity | undefined | null>;
  update: (user: IUserRepositoryUpdatePayload) => Promise<IUser>;
  updateResetPasswordToken: (id: number, token?: string) => Promise<void>;
  updateUserProfile: (userProfile: any) => Promise<any>;
  insertAnswer: (userAnswer: any) => Promise<void>;
  findUserProfile: (user: number) => Promise<IUserProfile | undefined>;
}
