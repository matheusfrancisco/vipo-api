import Email from "./email";

export default class Customer {
  private _name?: string;
  public readonly email: Email;
  public readonly password: string;

  constructor({ email, password, name }: any) {
    this.email = new Email(email);
    this.password = password;
    this._name = name;
  }

  get name(): Partial<string | undefined> {
    return this._name;
  }

  set name(name: Partial<string | undefined>) {
    if (name) {
      this._name = name;
    }
  }

  public toRepository(): Record<string, string | undefined | number> {
    return {
      name: this._name,
      email: this.email.value,
      password: this.password
    };
  }
}
