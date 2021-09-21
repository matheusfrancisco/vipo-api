import { IUserData } from "@domain/user/IUser";
import UserData from "@domain/user/user-data";

export interface IUserRepositoryUpdatePayload {
  userId: number;
  name?: string;
  lastName?: string;
  password?: string;
}

export default interface IUserRepository {
  save: (user: UserData) => Promise<IUserData>;
  findByEmail: (email: string) => Promise<IUserData | undefined>;
  update: (user: IUserRepositoryUpdatePayload) => Promise<IUserData>;
  updateResetPasswordToken: (id: number, token?: string) => Promise<IUserData>;
}
