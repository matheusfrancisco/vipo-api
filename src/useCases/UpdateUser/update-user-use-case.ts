import { IUser } from "@domain/user/user";
import { IUserRepository } from "@domain/user/user-repository";
import IUpdateUserDTO from "@useCases/UpdateUser/update-user-dto";

export class UpdateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    userId,
    name,
    lastName
  }: IUpdateUserDTO): Promise<IUser> {
    const updatedUser = await this.usersRepository.update({
      userId,
      name,
      lastName
    });

    return updatedUser;
  }
}
