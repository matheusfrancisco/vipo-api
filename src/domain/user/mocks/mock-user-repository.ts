import { IUserData } from "@domain/user/IUser";
import IUserRepository, {
  IUserRepositoryUpdatePayload
} from "@domain/user/IUserRepository";
import UserData from "@domain/user/user-data";

export default class MockUserRepository implements IUserRepository {
  private users: IUserData[] = [];

  public async save({
    name,
    lastName,
    gender,
    email,
    password,
    birthDate,
    resetPasswordToken
  }: UserData): Promise<IUserData> {
    const newUser: IUserData = {
      id: this.users.length + 1,
      name,
      lastName,
      gender,
      email,
      birthDate,
      resetPasswordToken,
      password
    };

    this.users.push(newUser);

    return newUser;
  }

  public async findByEmail(email: string): Promise<IUserData | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async update({
    userId,
    name,
    lastName,
    password
  }: IUserRepositoryUpdatePayload): Promise<IUserData> {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (!userIndex) throw new Error("User does not exist");

    const user = this.users[userIndex];
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (password) user.password = password;

    this.users[userIndex] = user;

    return user;
  }

  public async updateResetPasswordToken(
    id: number,
    token?: string
  ): Promise<IUserData> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (!userIndex) throw new Error("User does not exist");

    const user = this.users[userIndex];
    user.resetPasswordToken = token;

    this.users[userIndex] = user;

    return user;
  }
}
