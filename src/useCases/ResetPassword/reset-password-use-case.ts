import { IUserRepository } from "@domain/user/user-repository";
import IMailProvider from "@providers/MailProvider/models/IMailProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";
import IResetPasswordDTO from "@useCases/ResetPassword/reset-password-dto";

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

    if (!user) throw new Error("User does not exist");

    const tokenPayload = {
      userId: user.id
    };

    const resetToken = await this.tokenProvider.generateToken(tokenPayload);

    await this.usersRepository.updateResetPasswordToken(user.id, resetToken);

    await this.mailProvider.sendMail({
      template: "reset-password",
      to: user.email,
      resetPasswordLink: `${redirectURL}?jwt=${resetToken}`
    });
  }
}
