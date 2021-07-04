import { IEntityId } from "@domain/global";
import IProfile from "@domain/profile/IProfile";
import IProfilesRepository from "@domain/profile/IProfilesRepository";
import Profile from "@domain/profile/profile";
import { UserProfile } from "@infrastructure/database/entity/user-profile";
import { getRepository } from "typeorm";

export default class PostgresProfilesRepository implements IProfilesRepository {
  private repository = getRepository(UserProfile);

  public async findByUser(id: IEntityId): Promise<IProfile | undefined> {
    return this.repository.findOne({
      where: { user: id }
    });
  }

  public async createOrUpdateOne({
    id,
    user,
    drinks,
    foods,
    musicals
  }: Profile): Promise<IProfile> {
    const profile = this.repository.create({
      id,
      userId: user,
      drinks,
      foods,
      musicals
    });

    return this.repository.save(profile);
  }
}
