import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import { ServiceError } from "@errors/service-error";
import { IUserData } from "@domain/user/IUser";
import IUserRepository from "@domain/user/IUserRepository";
import ICreateUserDTO from "@useCases/CreateUser/create-user-dto";
import UserData from "@domain/user/user-data";
import IProfilesRepository from "@domain/profile/IProfilesRepository";
import User from "@domain/user/user";
import IProfile from "@domain/profile/IProfile";
import Profile from "@domain/profile";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private profileRepository: IProfilesRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute({
    name,
    email,
    password,
    lastName,
    birthDate,
    gender
  }: ICreateUserDTO): Promise<IUserData> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new ServiceError("User already exists.");
    }

    const hashPass = await this.hashProvider.generateHash(password);

    const user = new UserData({
      name,
      password: hashPass,
      email,
      lastName,
      gender,
      birthDate
    });
    const userCreated = await this.userRepository.save(user);
    const emptyProfile = new Profile({musicals: [], drinks: [], foods: [], user: userCreated.id})
    const profile = await this.profileRepository.save(emptyProfile);
    return new User(userCreated, profile);
  }
}
