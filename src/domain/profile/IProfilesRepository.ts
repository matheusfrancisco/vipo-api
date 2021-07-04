import { IEntityId } from "@domain/global";
import IProfile from "@domain/profile/IProfile";
import Profile from "@domain/profile/Profile";

export default interface IProfilesRepository {
  findByUser(id: IEntityId): Promise<IProfile | undefined>;
  createOrUpdateOne(profile: Profile): Promise<IProfile>;
}
