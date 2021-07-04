import { getRepository } from "typeorm";
import {
  IUserRepositoryUpdatePayload,
  IUserRepository,
  ISavedUser
} from "@domain/user/user-repository";
import { IUser } from "@domain/user/user";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { UserAnswer } from "@infrastructure/database/entity/user-answer";
import { RepositoryError } from "@errors/repository-error";
import { IUserAnswer } from "@domain/user/user-answer";

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

  public async insertAnswer({
    user,
    numberOfPeople,
    howMuch,
    recommendations,
    like
  }: IUserAnswer & { user: IUser }): Promise<void> {
    const entity = {
      user,
      numberOfPeople,
      howMuch,
      recommendations,
      like
    };
    try {
      await getRepository(UserAnswer).save(entity);
    } catch (error) {
      console.error(error.message, error.name, error.stack);
    }
  }
}
