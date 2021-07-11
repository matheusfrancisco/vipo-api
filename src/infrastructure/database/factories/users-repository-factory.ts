import IUserRepository from "@domain/user/IUserRepository";
import { PostgresUserRepository } from "@infrastructure/database/repositories/postgres-user-repository";

export default class UsersRepositoryFactory {
  public static make(): IUserRepository {
    return new PostgresUserRepository();
  }
}
