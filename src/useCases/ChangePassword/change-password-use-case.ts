import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import { ServiceError } from "@errors/service-error";
import { IUserData } from "@domain/user/IUser";
import IUserRepository from "@domain/user/IUserRepository";
import IChangePasswordDTO from "./change-password-dto";

export class ChangePasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    userId,
    dbPasswordHash,
    password,
    newPassword
  }: IChangePasswordDTO): Promise<IUserData> {
    const passwordsMatch = await this.hashProvider.hashesMatch(
      dbPasswordHash,
      password
    );

    if (!passwordsMatch) throw new ServiceError("Passwords don't match!");

    const newPasswordHash = await this.hashProvider.generateHash(newPassword);

    const user = await this.userRepository.update({
      userId,
      password: newPasswordHash
    });

    return user;
  }
}
