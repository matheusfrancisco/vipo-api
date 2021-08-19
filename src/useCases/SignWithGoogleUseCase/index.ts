import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";
import makeGoogleProvider from "@providers/GoogleProvider";
import makeTokenProvider from "@providers/TokenProvider";
import { SignWithGoogleController } from "@useCases/SignWithGoogleUseCase/sign-with-google-controller";
import { SignWithGoogleUseCase } from "@useCases/SignWithGoogleUseCase/sign-with-google-use-case";

interface IBuildResult {
  signWithGoogleController: SignWithGoogleController;
}

export class SignWithGoogleUseCaseFactory {
  public static build(): IBuildResult {
    const usersRepository = UsersRepositoryFactory.make();
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
