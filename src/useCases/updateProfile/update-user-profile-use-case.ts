import { IUserRepository } from "../../domain/user/user-repository";
import UserProfile from "../../domain/user/user-profile";
import IUpdateUserProfileDTO from "./update-user-profile-dto";

export interface UserResource {
  id: number;
  name: string;
  email: string;
}

export class UpdateUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userId,
    profileInformations
  }: IUpdateUserProfileDTO): Promise<any> {
    const userProfile = new UserProfile({
      user: userId,
      musicals: profileInformations.musicals,
      drinks: profileInformations.drinks,
      foods: profileInformations.foods
    });

    const profileUpdate = await this.userRepository.updateUserProfile({
      ...userProfile.toRepository()
    });

    return profileUpdate;
  }
}
