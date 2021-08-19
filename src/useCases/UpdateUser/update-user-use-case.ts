import { IUserData } from "@domain/user/IUser";
import IUserRepository from "@domain/user/IUserRepository";
import IUpdateUserDTO from "@useCases/UpdateUser/update-user-dto";

export class UpdateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    userId,
    name,
    lastName
  }: IUpdateUserDTO): Promise<IUserData> {
    const updatedUser = await this.usersRepository.update({
      userId,
      name,
      lastName
    });

    return updatedUser;
  }
}
