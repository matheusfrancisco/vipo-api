import IProfilesRepository from "@domain/profile/IProfilesRepository";

export default class MockProfilesRepository implements IProfilesRepository {
  public findByUser = jest.fn();

  public createOrUpdateOne = jest.fn();
}
