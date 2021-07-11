import IMailProvider from "@providers/MailProvider/models/IMailProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";
import IResetPasswordDTO from "@useCases/ResetPassword/reset-password-dto";
import { ServiceError } from "@errors/service-error";
import IUserRepository from "@domain/user/IUserRepository";

const TOKEN_EXPIRE_TIME = "30m";

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private tokenProvider: ITokenProvider,
    private mailProvider: IMailProvider
  ) {}

  public async execute({
    email,
    redirectURL
  }: IResetPasswordDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new ServiceError("User does not exist");

    const tokenPayload = {
      userId: user.id,
      email: user.email
    };

    const resetToken = await this.tokenProvider.generateToken(tokenPayload, {
      expiresIn: TOKEN_EXPIRE_TIME
    });

    await this.usersRepository.updateResetPasswordToken(user.id, resetToken);

    await this.mailProvider.sendMail({
      template: "reset-password",
      to: user.email,
      resetPasswordLink: `${redirectURL}?jwt=${resetToken}`
    });
  }
}
