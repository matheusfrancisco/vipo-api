import IProfilesRepository from "@domain/profile/IProfilesRepository";
import IUser from "@domain/user/IUser";
import IUserRepository from "@domain/user/IUserRepository";
import User from "@domain/user/user";
import IProfileUserDTO from "@useCases/GetProfileUser/profile-user-dto";

export class ProfileUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private profilesRepository: IProfilesRepository
  ) {}

  public async execute({ email }: IProfileUserDTO): Promise<IUser | undefined> {
    const userData = await this.userRepository.findByEmail(email);

    if (!userData) return undefined;

    const profile = await this.profilesRepository.findByUser(userData.id);

    if (!profile) return undefined;

    const user = new User(userData, profile);

    return user;
  }
}
