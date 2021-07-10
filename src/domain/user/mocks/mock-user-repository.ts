import IUser from "@domain/user/IUser";
import { IUserRepository } from "@domain/user/user-repository";

export default class MockUserRepository implements IUserRepository {
  public save = jest.fn();

  public findByEmail = jest.fn();

  public update = jest.fn(() => Promise.resolve({} as IUser));

  public updateResetPasswordToken = jest.fn();
}
