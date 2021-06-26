import { getRepository } from "typeorm";
import {
  IUserRepositoryUpdatePayload,
  IUserRepository,
  ISavedUser
} from "@domain/user/user-repository";
import { IUser } from "@domain/user/user";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { UserAnswer } from "@infrastructure/database/entity/user-answer";
import { UserProfile } from "@infrastructure/database/entity/user-profile";
import { IUserProfile } from "@domain/user/user-profile";
import { RepositoryError } from "@errors/repository-error";
import { IUserAnswer } from "@domain/user/user-answer";
import { IUserFeedback } from "@domain/user/user-feedback";
import { UserFeedback } from "@infrastructure/database/entity/user-feedback";

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

  public async updateUserProfile({
    musicals,
    user,
    foods,
    drinks
  }: IUserProfile): Promise<UserProfile | void> {
    const userProfileRepository = getRepository(UserProfile);
    const entity = { user, musicals, foods, drinks };

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

  public async findUserProfile(
    user: number
  ): Promise<IUserProfile | undefined> {
    const userProfileRepository = getRepository(UserProfile);

    const userProfile = await userProfileRepository.findOne({
      where: { user }
    });

    if (!userProfile) return undefined;

    return {
      user,
      drinks: userProfile.drinks,
      foods: userProfile.foods,
      musicals: userProfile.musicals
    };
  }

  public async receiveFeedback({
    userId,
    venueId,
    rating,
    bestRatedItem,
    leastRatedItem,
    comments
  }: Omit<IUserFeedback, "createdAt" | "updatedAt">): Promise<void> {
    const usersRepository = getRepository(UserEntity);
    const userFeedbackRepository = getRepository(UserFeedback);

    try {
      await usersRepository.findOneOrFail(userId);

      await userFeedbackRepository.save({
        userId,
        venueId,
        rating,
        bestRatedItem,
        leastRatedItem,
        comments
      });
    } catch (error) {
      throw new RepositoryError(error.message, error.name, error.stack);
    }
  }
}
