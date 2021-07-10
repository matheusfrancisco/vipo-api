import { Gender } from "@domain/user/IUser";
import { IUserDataArgs } from "@domain/user/user-data";
import faker from "faker";

export default class MockUserData implements IUserDataArgs {
  public name: string;

  public lastName: string;

  public birthDate: Date;

  public gender: Gender;

  public email: string;

  public password: string;

  public resetPasswordToken?: string;

  constructor({
    password,
    name,
    lastName,
    birthDate,
    gender,
    resetPasswordToken,
    email
  }: Partial<IUserDataArgs> = {}) {
    this.name = name || faker.name.firstName();
    this.lastName = lastName || faker.name.lastName();
    this.email = email || faker.internet.email();
    this.password = password || faker.internet.password();
    this.gender = gender || faker.helpers.randomize(Object.values(Gender));
    this.birthDate = birthDate || faker.date.past();
    this.resetPasswordToken = resetPasswordToken;
  }
}
