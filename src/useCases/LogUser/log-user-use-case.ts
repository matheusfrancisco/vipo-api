import { IUser } from "@domain/user/user";
import { IUserAnswer } from "@domain/user/user-answer";
import { IUserRepository } from "@domain/user/user-repository";
import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";
import ILogUserDTO from "@useCases/LogUser/log-user-dto";

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

    if (!user) throw new Error("User does not exist");

    const match = await this.hashProvider.hashesMatch(password, user.password);

    if (!match) throw new Error("Passwords don't match");

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
