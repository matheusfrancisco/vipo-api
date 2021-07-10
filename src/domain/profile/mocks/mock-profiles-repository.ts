import { IEntityId } from "@domain/global";
import IProfile from "@domain/profile/IProfile";
import IProfilesRepository from "@domain/profile/IProfilesRepository";
import Profile from "@domain/profile/profile";
import MockUserData from "@domain/user/mocks/mock-user-data";

export default class MockProfilesRepository implements IProfilesRepository {
  private profiles: IProfile[] = [];

  public async findByUser(id: IEntityId): Promise<IProfile | undefined> {
    return this.profiles.find(profile => profile.user.id === id);
  }

  public async save({
    id,
    user,
    musicals,
    drinks,
    foods
  }: Profile): Promise<IProfile> {
    const mockedUser = new MockUserData();

    const newProfile: IProfile = {
      id: id || this.profiles.length + 1,
      user: {
        ...mockedUser,
        id: user
      },
      musicals,
      drinks,
      foods
    };

    const foundIndex = this.profiles.findIndex(profile => profile.id === id);

    if (!foundIndex) {
      this.profiles.push(newProfile);

      return newProfile;
    }

    const profile = this.profiles[foundIndex];
    Object.assign(profile, { musicals, drinks, foods, user });
    this.profiles[foundIndex] = profile;

    return profile;
  }
}
