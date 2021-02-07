import Email from "./email";
import { Gender } from "../../infrastructure/entity/user-entity";

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
}

export default class User {
  private _name: string;
  private _lastName: string;
  private _birthDate: Date;
  private _gender: Gender;
  public readonly email: Email;
  public readonly password: string;

  constructor({
    email,
    password,
    name,
    lastName,
    birthDate,
    gender,
  }: IUser) {
    this.email = new Email(email);
    this.password = password;
    this._name = name;
    this._lastName = lastName;
    this._birthDate = birthDate;
    this._gender = gender;
  }

  get name(): Partial<string> {
    return this._name;
  }

  set name(name: Partial<string>) {
    if (name) {
      this._name = name;
    }
  }

  get gender(): Partial<string> {
    return this._gender;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  get lastName(): string {
    return this._lastName;
  }

  public toRepository(): IUser {
    return {
      name: this._name,
      email: this.email.value,
      password: this.password,
      gender: this._gender,
      birthDate: this._birthDate,
      lastName: this._lastName,
    };
  }
}
