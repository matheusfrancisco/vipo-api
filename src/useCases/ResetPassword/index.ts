import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import makeMailProvider from "@providers/MailProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { ResetPasswordController } from "@useCases/ResetPassword/reset-password-controller";
import { ResetPasswordUseCase } from "@useCases/ResetPassword/reset-password-use-case";

interface IBuildResult {
  resetPasswordController: ResetPasswordController;
}

export class ResetPasswordUseCaseFactory {
  public static build(): IBuildResult {
    const usersRepository = UsersRepositoryFactory.make();
    const tokenProvider = makeTokenProvider();
    const mailProvider = makeMailProvider();

    const resetPasswordUseCase = new ResetPasswordUseCase(
      usersRepository,
      tokenProvider,
      mailProvider
    );

    const resetPasswordController = new ResetPasswordController(
      resetPasswordUseCase
    );

    return { resetPasswordController };
  }
}
