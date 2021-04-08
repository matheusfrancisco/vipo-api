import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import { ServiceError } from "@errors/service-error";
import User, { IUser } from "../../domain/user/user";
import { IUserRepository } from "../../domain/user/user-repository";

type UserResource = Omit<IUser, "password">;

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute({
    name,
    email,
    password,
    lastName,
    birthDate,
    gender
  }: IUser): Promise<UserResource> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new ServiceError("User already exists.");
    }

    const hashPass = await this.hashProvider.generateHash(password);
    const user = new User({
      name,
      password: hashPass,
      email,
      lastName,
      gender,
      birthDate
    });

    return this.userRepository.save({ ...user.toRepository() });
  }
}
