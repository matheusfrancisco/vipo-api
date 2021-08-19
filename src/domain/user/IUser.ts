import { IEntityId } from "@domain/global";
import IProfile from "@domain/profile/IProfile";

export enum Gender {
  Male = "male",
  Female = "female",
  Neuter = "neuter"
}

export interface IUserData {
  id: IEntityId;
  name: string;
  email: string;
  password: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  resetPasswordToken?: string;
}

export interface IUser {
  id: IEntityId;
  name: string;
  email: string;
  password: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  resetPasswordToken?: string;
  profile: Omit<IProfile, "user">;
}
