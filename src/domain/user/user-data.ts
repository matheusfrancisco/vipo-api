import { Gender } from "@domain/user/IUser";

// Copy from stackoverflow :)
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface IUserDataArgs {
  name: string;
  lastname: string;
  birthdate: Date;
  gender: Gender;
  email: string;
  password: string;
  resetPasswordToken?: string;
}

export default class UserData {
  public name: string;

  public lastname: string;

  public birthdate: Date;

  public gender: Gender;

  public email: string;

  public password: string;

  public resetPasswordToken?: string;

  constructor({
    email,
    password,
    name,
    lastname,
    birthdate,
    gender,
    resetPasswordToken
  }: IUserDataArgs) {
    this.email = this.validateEmail(email);
    this.password = password;
    this.resetPasswordToken = resetPasswordToken;
    this.name = name;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.gender = gender;
  }

  private validateEmail(email: string): string {
    const validationRegex = new RegExp(EMAIL_REGEX);
    const isValid = validationRegex.test(email);

    if (!isValid) throw new Error("Invalid email");

    return email;
  }
}
