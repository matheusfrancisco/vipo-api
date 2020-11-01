import { CustomerRepository } from "src/domain/user/user-repository";
import { UserEntity } from "./entity/user-entity";
import { UserProfile } from "./entity/user-profile";
import { Connection, getRepository } from "typeorm";
import User from "../domain/user/user";

export class PostgresCustomerRepository implements CustomerRepository {
  constructor(public connection: Connection) {}
  public async save({ name, email, password }: User): Promise<void> {
    const entity = {
      name: name,
      email: email.value,
      password: password
    };
    await getRepository(UserEntity).save(entity);
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const userRepository = await getRepository(UserEntity).findOne({
      email
    });
    if (userRepository) {
      return userRepository;
    }
  }

  public async updateUserProfile({
    musicals,
    userId,
    foods,
    drinks
  }: any) {

    const userProfileRepository = getRepository(UserProfile);
    const entity = { user: userId, musicals, foods, drinks }

    const userProfile = await userProfileRepository.findOne({
      where: {
        user: entity.user
      },
    })

    //#TODO for instance i don't read about
    //partial updating using typeorm but I think has a better away to do this.
    if (userProfile) {
      console.log(entity)
      await userProfileRepository.update(userProfile.id, entity)
    } else {
      await userProfileRepository.save(entity)
    }

    const findUserProfile = await userProfileRepository.findOne({
      where: {
        user: entity.user
      },
    })

    console.log(findUserProfile)
    return findUserProfile
  }
}
