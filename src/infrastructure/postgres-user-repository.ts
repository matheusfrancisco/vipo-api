import { Connection, getRepository } from "typeorm";
import {
  IUserRepositoryUpdatePayload,
  UserRepository
} from "@domain/user/user-repository";
import { IUser } from "@domain/user/user";
import { UserEntity } from "@infrastructure/entity/user-entity";
import { UserAnswer } from "@infrastructure/entity/user-answer";
import { UserProfile } from "@infrastructure/entity/user-profile";

export class PostgresUserRepository implements UserRepository {
  constructor(public connection: Connection) {}

  public async save({
    name,
    email,
    password,
    gender,
    birthDate,
    lastName
  }: IUser): Promise<void> {
    const entity = {
      name,
      email,
      password,
      birthDate,
      gender,
      lastName
    };
    await getRepository(UserEntity).save(entity);
  }

  public async findByEmail(
    email: string
  ): Promise<UserEntity | undefined | null> {
    const userRepository = await getRepository(UserEntity).findOne({
      email
    });
    if (!userRepository) {
      return null;
    }
    return userRepository;
  }

  public async updateUserProfile({ musicals, userId, foods, drinks }: any) {
    const userProfileRepository = getRepository(UserProfile);
    const entity = { user: userId, musicals, foods, drinks };

    const userProfile = await userProfileRepository.findOne({
      where: {
        user: entity.user
      }
    });

    // #TODO for instance i don't read about
    // partial updating using typeorm but I think has a better away to do this.
    if (userProfile) {
      await userProfileRepository.update(userProfile.id, entity);
    } else {
      await userProfileRepository.save(entity);
    }

    const findUserProfile = await userProfileRepository.findOne({
      where: {
        user: entity.user
      }
    });

    return findUserProfile;
  }

  public async update({
    userId,
    ...updateFields
  }: IUserRepositoryUpdatePayload): Promise<IUser> {
    const usersRepository = getRepository(UserEntity);

    const user = await usersRepository.findOneOrFail(userId);

    const updatedUser = await usersRepository.save({
      ...user,
      ...updateFields
    });

    return updatedUser;
  }

  public async insertAnswer({
    user,
    numberOfPeople,
    howMuch,
    recommendations,
    like
  }: UserAnswer): Promise<void> {
    const entity = {
      user,
      numberOfPeople,
      howMuch,
      recommendations,
      like
    };
    try {
      const t = await getRepository(UserAnswer).save(entity);
    } catch (err) {
      console.log(err);
    }
  }
}
