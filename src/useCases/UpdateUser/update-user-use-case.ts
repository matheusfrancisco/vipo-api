import IUser from "@domain/user/IUser";
import { IUserRepository } from "@domain/user/user-repository";
import IUpdateUserDTO from "@useCases/UpdateUser/update-user-dto";

export class UpdateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    userId,
    name,
    lastName
  }: IUpdateUserDTO): Promise<Omit<IUser, "password">> {
    const updatedUser = await this.usersRepository.update({
      userId,
      name,
      lastName
    });

    return {
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      birthDate: updatedUser.birthDate,
      gender: updatedUser.gender
    };
  }
}
