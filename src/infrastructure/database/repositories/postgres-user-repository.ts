import { getRepository } from "typeorm";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { RepositoryError } from "@errors/repository-error";
import { IUserData } from "@domain/user/IUser";
import IUserRepository, {
  IUserRepositoryUpdatePayload
} from "@domain/user/IUserRepository";
import UserData from "@domain/user/user-data";

export class PostgresUserRepository implements IUserRepository {
  private repository = getRepository(UserEntity);

  public async save({
    name,
    email,
    password,
    gender,
    birthDate,
    lastName
  }: UserData): Promise<IUserData> {
    try {
      const user = this.repository.create({
        name,
        email,
        password,
        gender,
        birthDate,
        lastName
      });

      return this.repository.save(user);
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }

  public async findByEmail(email: string): Promise<IUserData | undefined> {
    try {
      return this.repository.findOne({
        where: {
          email
        }
      });
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }

  public async updateResetPasswordToken(
    id: number,
    token?: string
  ): Promise<IUserData> {
    try {
      const foundUser = await this.repository.findOneOrFail(id);

      const updatedUser = this.repository.create({
        ...foundUser,
        resetPasswordToken: token
      });

      return this.repository.save(updatedUser);
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }

  public async update({
    userId,
    ...updateFields
  }: IUserRepositoryUpdatePayload): Promise<IUserData> {
    try {
      const user = await this.repository.findOneOrFail(userId);

      const updatedUser = this.repository.create({
        ...user,
        ...updateFields
      });

      return this.repository.save(updatedUser);
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }
}
