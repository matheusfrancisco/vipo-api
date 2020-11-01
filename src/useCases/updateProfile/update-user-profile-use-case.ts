
import { CustomerRepository } from "../../domain/user/user-repository";
import UserProfile from '../../domain/user/user-profile';
import bcrypt from "bcrypt";

export interface UserResource {
  id: number;
  name: string;
  email: string;
}

export class UpdateUserProfileUseCase {
  constructor(private userRepository: CustomerRepository) {}

  //#TODO improve type any
  async execute({ userId, profileInformations }: any) {
    try {

      const userProfile = new UserProfile({
        userId,
        musicals: profileInformations.musicals,
        drinks: profileInformations.drinks,
        foods: profileInformations.foods,
      })

      const profileUpdate = await this.userRepository.updateUserProfile({
        ...userProfile.toRepository(),
      })

      return profileUpdate
    } catch (error) {
      throw error;
    }
  }
}
