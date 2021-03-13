import { IUser } from "@domain/user/user";
import { IUserProfile } from "@domain/user/user-profile";
import { UserRepository } from "@domain/user/user-repository";

interface IProfileUser {
  email: string;
}

interface IUserWithProfile {
  name: IUser["name"];
  lastName: IUser["lastName"];
  email: IUser["email"];
  birthDate: IUser["birthDate"];
  gender: IUser["gender"];
  profileInformations: Omit<IUserProfile, "user">;
}

export class ProfileUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    email
  }: IProfileUser): Promise<IUserWithProfile | undefined> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return undefined;

    const userProfile = await this.userRepository.findUserProfile(user.id);

    if (!userProfile) return undefined;

    // I'm creating a new return object so there are no connections from the other layers, meaning whatever happens to the data structures on the repository
    // the controller can always expect the same return value
    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      gender: user.gender,
      profileInformations: {
        drinks: userProfile.drinks,
        foods: userProfile.foods,
        musicals: userProfile.musicals
      }
    };
  }
}
