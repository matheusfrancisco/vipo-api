import { IUser } from "src/domain/user/user";
import { UserRepository } from "src/domain/user/user-repository";
import IUpdateUserDTO from "./update-user-dto";

export class UpdateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

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
