import { IEntityId } from "@domain/global";
import IProfile from "@domain/profile/IProfile";
import Profile from "@domain/profile";

export default interface IProfilesRepository {
  findByUser(id: IEntityId): Promise<IProfile | undefined>;
  save(profile: Profile): Promise<IProfile>;
}
