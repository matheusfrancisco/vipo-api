import Email from "./email";

export default class Customer {
  private _firstName?: string;
  private _lastName?: string;
  public readonly email: Email;
  public readonly password: string;

  constructor({ email, password, lastName, firstName }: any) {
    this.email = new Email(email);
    this.password = password;
    this._lastName = lastName;
    this._firstName = firstName;
  }

  get firstName(): Partial<string | undefined> {
    return this._firstName;
  }

  set firstName(firstName: Partial<string | undefined>) {
    if (firstName) {
      this._firstName = firstName;
    }
  }

  get lastName(): Partial<string | undefined> {
    return this._lastName;
  }

  set lastName(lastName: Partial<string | undefined>) {
    if (lastName) {
      this._lastName = lastName;
    }
  }

  public toRepository(): Record<string, string | undefined | number> {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      email: this.email.value,
      password: this.password
    };
  }
}
