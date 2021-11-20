import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";
import ILogUserDTO from "@useCases/LogUser/log-user-dto";
import { ServiceError } from "@errors/service-error";
import { IUserData } from "@domain/user/IUser";
import IUserRepository from "@domain/user/IUserRepository";

interface IExecute {
  token: string;
  user: IUserData;
}

export class LogUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private tokenProvider: ITokenProvider,
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: ILogUserDTO): Promise<IExecute> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new ServiceError("user_not_exist");

    const match = await this.hashProvider.hashesMatch(user.password, password);

    if (!match) throw new ServiceError("invalid_password");

    const tokenPayload = {
      id: user.id,
      email
    };

    const token = await this.tokenProvider.generateToken(tokenPayload);

    Reflect.deleteProperty(user, "password");

    return {
      token,
      user
    };
  }
}
