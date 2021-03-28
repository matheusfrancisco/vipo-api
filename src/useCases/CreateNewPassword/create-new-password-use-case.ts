import { IUserRepository } from "@domain/user/user-repository";
import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";
import ICreateNewPasswordDTO from "@useCases/CreateNewPassword/create-new-password-dto";

interface ITokenPayload {
  userId: number;
  email: string;
}

export class CreateNewPasswordUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private tokenProvider: ITokenProvider,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    password,
    token
  }: ICreateNewPasswordDTO): Promise<void> {
    const decoded = await this.tokenProvider.decodeToken<ITokenPayload>(token);

    if (!decoded.userId || !decoded.email)
      throw new Error("Invalid token provided");

    const user = await this.usersRepository.findByEmail(decoded.email);

    if (!user) throw new Error("User doest not exist");

    if (decoded.userId !== user.id) throw new Error("Invalid user provided");

    const newHashedPassword = await this.hashProvider.generateHash(password);

    await this.usersRepository.update({
      userId: user.id,
      password: newHashedPassword
    });
  }
}
