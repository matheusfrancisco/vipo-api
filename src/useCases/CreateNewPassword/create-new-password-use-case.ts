import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";
import ICreateNewPasswordDTO from "@useCases/CreateNewPassword/create-new-password-dto";
import { ServiceError } from "@errors/service-error";
import IUserRepository from "@domain/user/IUserRepository";
import { IUserData } from "@domain/user/IUser";

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
  }: ICreateNewPasswordDTO): Promise<IUserData> {
    const decoded = await this.tokenProvider.decodeToken<ITokenPayload>(token);

    this.checkIfDecodedValueIsValid(decoded);

    const user = await this.usersRepository.findByEmail(decoded.email);

    if (!user) throw new ServiceError("User doest not exist");

    if (decoded.userId !== user.id)
      throw new ServiceError("Invalid user provided");

    const newHashedPassword = await this.hashProvider.generateHash(password);

    return this.usersRepository.update({
      userId: user.id,
      password: newHashedPassword
    });
  }

  private checkIfDecodedValueIsValid(decoded: ITokenPayload): void {
    if (!decoded.userId || !decoded.email)
      throw new ServiceError("Invalid token provided");
  }
}
