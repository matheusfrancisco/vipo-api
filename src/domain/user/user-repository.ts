import IProfile from "@domain/profile/IProfile";
import { IUserAnswer } from "@domain/user/user-answer";
import { IUserFeedback } from "@domain/user/user-feedback";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { IUser } from "./user";

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
  findByEmail: (email: string) => Promise<UserEntity | undefined>;
  update: (user: IUserRepositoryUpdatePayload) => Promise<IUser>;
  updateResetPasswordToken: (id: number, token?: string) => Promise<void>;
  updateUserProfile: (userProfile: any) => Promise<any>;
  insertAnswer: (userAnswer: IUserAnswer & { user: IUser }) => Promise<void>;
  findUserProfile: (user: number) => Promise<IProfile | undefined>;
  receiveFeedback: (
    userFeedback: Omit<IUserFeedback, "createdAt" | "updatedAt">
  ) => Promise<void>;
}
