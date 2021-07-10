import IProfile from "@domain/profile/IProfile";
import IProfilesRepository from "@domain/profile/IProfilesRepository";
import IUser from "@domain/user/IUser";
import { IUserRepository } from "@domain/user/user-repository";

interface IProfileUser {
  email: string;
}

interface IUserWithProfile {
  name: IUser["name"];
  lastName: IUser["lastName"];
  email: IUser["email"];
  birthDate: IUser["birthDate"];
  gender: IUser["gender"];
  profileInformations: Omit<IProfile, "user">;
}

export class ProfileUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private profilesRepository: IProfilesRepository
  ) {}

  public async execute({
    email
  }: IProfileUser): Promise<IUserWithProfile | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return undefined;

    const profile = await this.profilesRepository.findByUser(user.id);

    // I'm creating a new return object so there are no connections from the other layers, meaning whatever happens to the data structures on the repository
    // the controller can always expect the same return value
    // remove undefined from  birthDate, gender..
    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      gender: user.gender,
      profileInformations: {
        drinks: profile ? profile.drinks : [],
        foods: profile ? profile.foods : [],
        musicals: profile ? profile.musicals : []
      }
    };
  }
}
