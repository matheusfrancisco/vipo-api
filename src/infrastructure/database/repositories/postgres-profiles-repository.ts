import { IEntityId } from "@domain/global";
import IProfile from "@domain/profile/IProfile";
import IProfilesRepository from "@domain/profile/IProfilesRepository";
import Profile from "@domain/profile";
import { RepositoryError } from "@errors/repository-error";
import { UserProfile } from "@infrastructure/database/entity/user-profile";
import { getRepository } from "typeorm";

export default class PostgresProfilesRepository implements IProfilesRepository {
  private repository = getRepository(UserProfile);

  public async findByUser(id: IEntityId): Promise<IProfile | undefined> {
    try {
      return await this.repository.findOne({
        where: { userId: id }
      });
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }

  public async save({
    id,
    user,
    drinks,
    foods,
    musicals
  }: Profile): Promise<IProfile> {
    try {
      const profile = this.repository.create({
        id,
        userId: user,
        drinks,
        foods,
        musicals
      });

      return this.repository.save(profile);
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }

  public async update({
    id,
    drinks,
    foods,
    musicals
  }: Profile): Promise<IProfile> {
    try {
      const profile = await this.repository.findOneOrFail(id);
      const updateProfile = this.repository.create({
        ...profile,
        ...{
          drinks,
          musicals,
          foods
        }
      });
      return this.repository.save(updateProfile);
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }
}
