import { getRepository } from "typeorm";
import {
  IUserRepositoryUpdatePayload,
  IUserRepository,
  ISavedUser
} from "@domain/user/user-repository";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { RepositoryError } from "@errors/repository-error";
import IUser from "@domain/user/IUser";

export class PostgresUserRepository implements IUserRepository {
  public async save({
    name,
    email,
    password,
    gender,
    birthDate,
    lastName
  }: IUser): Promise<ISavedUser> {
    const entity = {
      name,
      email,
      password,
      birthDate,
      gender,
      lastName
    };
    const user = await getRepository(UserEntity).save(entity);

    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      gender: user.gender,
      createdAt: user.createdAt
    };
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return getRepository(UserEntity).findOne({
      where: {
        email
      }
    });
  }

  public async updateResetPasswordToken(
    id: number,
    token?: string
  ): Promise<void> {
    const usersRepository = getRepository(UserEntity);

    const user = await usersRepository.findOneOrFail(id);

    await usersRepository.save({
      ...user,
      resetPasswordToken: token
    });
  }

  public async update({
    userId,
    ...updateFields
  }: IUserRepositoryUpdatePayload): Promise<IUser> {
    try {
      const usersRepository = getRepository(UserEntity);

      const user = await usersRepository.findOneOrFail(userId);

      const updatedUser = await usersRepository.save({
        ...user,
        ...updateFields
      });

      return updatedUser;
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }
}
