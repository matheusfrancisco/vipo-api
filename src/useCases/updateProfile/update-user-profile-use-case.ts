
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

  async execute({ userId, informations }: any) {
    try {

      const userProfile = new UserProfile({
        userId,
        musicals: informations.musicals,
        drinks: informations.drinks,
        foods: informations.drinks,
      })

      const profileUpdate = await this.userRepository.updateUserProfile({
        ...userProfile.toRepository(),
      })
      return
    } catch (error) {
      throw error;
    }
  }
}
