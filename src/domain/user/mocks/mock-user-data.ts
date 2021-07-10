import { Gender } from "@domain/user/IUser";
import { IUserDataArgs } from "@domain/user/user-data";
import faker from "faker";

export default class MockUserData implements IUserDataArgs {
  public name: string;

  public lastname: string;

  public birthdate: Date;

  public gender: Gender;

  public email: string;

  public password: string;

  public resetPasswordToken?: string;

  constructor({
    password,
    name,
    lastname,
    birthdate,
    gender,
    resetPasswordToken,
    email
  }: Partial<IUserDataArgs> = {}) {
    this.name = name || faker.name.firstName();
    this.lastname = lastname || faker.name.lastName();
    this.email = email || faker.internet.email();
    this.password = password || faker.internet.password();
    this.gender = gender || faker.helpers.randomize(Object.values(Gender));
    this.birthdate = birthdate || faker.date.past();
    this.resetPasswordToken = resetPasswordToken;
  }
}
