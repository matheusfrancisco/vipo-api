import { PostgresUserRepository } from "@infrastructure/database/postgres-user-repository";
import makeGoogleProvider from "@providers/GoogleProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { SignWithGoogleController } from "@useCases/SignWithGoogleUseCase/sign-with-google-controller";
import { SignWithGoogleUseCase } from "@useCases/SignWithGoogleUseCase/sign-with-google-use-case";
import { Connection } from "typeorm";

interface IBuildResult {
  signWithGoogleController: SignWithGoogleController;
}

export class SignWithGoogleUseCaseFactory {
  public static build(connection: Connection): IBuildResult {
    const usersRepository = new PostgresUserRepository();
    const googleProvider = makeGoogleProvider();
    const tokenProvider = makeTokenProvider();

    const signWithGoogleUseCase = new SignWithGoogleUseCase(
      usersRepository,
      googleProvider,
      tokenProvider
    );

    const signWithGoogleController = new SignWithGoogleController(
      signWithGoogleUseCase
    );

    return {
      signWithGoogleController
    };
  }
}
