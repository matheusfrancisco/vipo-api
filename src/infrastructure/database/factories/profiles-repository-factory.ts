import IProfilesRepository from "@domain/profile/IProfilesRepository";
import PostgresProfilesRepository from "@infrastructure/database/repositories/postgres-profiles-repository";

export default class ProfilesRepositoryFactory {
  public static make(): IProfilesRepository {
    return new PostgresProfilesRepository();
  }
}
