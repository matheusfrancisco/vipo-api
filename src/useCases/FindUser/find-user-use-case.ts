import IFindUserDTO from "@useCases/FindUser/find-user-dto";
import { IUserRepository } from "../../domain/user/user-repository";

export interface IUserResource {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email }: IFindUserDTO): Promise<IUserResource | undefined> {
    const user = await this.userRepository.findByEmail(email);

    return user || undefined;
  }
}
