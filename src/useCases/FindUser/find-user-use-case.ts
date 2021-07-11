import { IUserData } from "@domain/user/IUser";
import IUserRepository from "@domain/user/IUserRepository";
import IFindUserDTO from "@useCases/FindUser/find-user-dto";

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email }: IFindUserDTO): Promise<IUserData | undefined> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }
}
