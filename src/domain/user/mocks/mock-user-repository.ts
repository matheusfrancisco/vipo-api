import { UserRepository } from "@domain/user/user-repository";

export default class MockUserRepository implements UserRepository {
  public save = jest.fn();

  public findByEmail = jest.fn();

  public update = jest.fn();

  public updateUserProfile = jest.fn();

  public insertAnswer = jest.fn();

  public findUserProfile = jest.fn();
}
