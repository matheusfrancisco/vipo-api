import IProfilesRepository from "@domain/profile/IProfilesRepository";
import Profile from "@domain/profile/profile";
import IUpdateUserProfileDTO from "./update-user-profile-dto";

export interface UserResource {
  id: number;
  name: string;
  email: string;
}

export class UpdateUserProfileUseCase {
  constructor(private profilesRepository: IProfilesRepository) {}

  async execute({
    userId,
    profileInformations
  }: IUpdateUserProfileDTO): Promise<any> {
    const profile = new Profile({
      user: userId,
      musicals: profileInformations.musicals,
      drinks: profileInformations.drinks,
      foods: profileInformations.foods
    });

    const profileUpdate = await this.profilesRepository.save(profile);

    return profileUpdate;
  }
}
