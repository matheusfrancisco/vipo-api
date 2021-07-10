import { IEntityId } from "@domain/global";
import IProfile from "@domain/profile/IProfile";
import IUser, { Gender, IUserData } from "@domain/user/IUser";

export default class User implements IUser {
  public id: IEntityId;

  public name: string;

  public lastName: string;

  public birthDate: Date;

  public gender: Gender;

  public email: string;

  public password: string;

  public resetPasswordToken?: string;

  public profile: IUser["profile"];

  constructor(
    {
      id,
      email,
      password,
      name,
      lastName,
      birthDate,
      gender,
      resetPasswordToken
    }: IUserData,
    profile: IProfile
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.gender = gender;
    this.resetPasswordToken = resetPasswordToken;
    this.profile = {
      id: profile.id,
      drinks: profile.drinks,
      musicals: profile.musicals,
      foods: profile.foods
    };
  }
}
