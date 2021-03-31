import { PostgresUserRepository } from "@infrastructure/postgres-user-repository";
import makeMailProvider from "@providers/MailProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { ResetPasswordController } from "@useCases/ResetPassword/reset-password-controller";
import { ResetPasswordUseCase } from "@useCases/ResetPassword/reset-password-use-case";
import { Connection } from "typeorm";

interface IBuildResult {
  resetPasswordController: ResetPasswordController;
}

export class ResetPasswordUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
    const usersRepository = new PostgresUserRepository(connection);
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
