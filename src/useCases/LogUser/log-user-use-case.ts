import { IUser } from "@domain/user/user";
import { IUserRepository } from "@domain/user/user-repository";
import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";
import ILogUserDTO from "@useCases/LogUser/log-user-dto";
import { ServiceError } from "@errors/service-error";

interface IExecute {
  token: string;
  user: {
    id: number;
    name: IUser["name"];
    lastName: IUser["lastName"];
    email: IUser["email"];
    gender: IUser["gender"];
    birthDate: IUser["birthDate"];
    createdAt: Date;
  };
}

export class LogUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private tokenProvider: ITokenProvider,
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: ILogUserDTO): Promise<IExecute> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new ServiceError("User does not exist");

    const match = await this.hashProvider.hashesMatch(user.password, password);

    if (!match) throw new ServiceError("Passwords don't match");

    const tokenPayload = {
      id: user.id,
      email
    };

    const token = await this.tokenProvider.generateToken(tokenPayload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        birthDate: user.birthDate,
        createdAt: user.createdAt
      }
    };
  }
}
