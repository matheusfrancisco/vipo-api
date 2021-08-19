import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
import MockMailProvider from "@providers/MailProvider/mocks/MockMailProvider";
import MockTokenProvider from "@providers/TokenProvider/mocks/MockTokenProvider";
import { ResetPasswordUseCase } from "@useCases/ResetPassword/reset-password-use-case";

const getUseCase = () => {
  const repository = new MockUserRepository();
  const tokenProvider = new MockTokenProvider();
  const mailProvider = new MockMailProvider();

  const useCase = new ResetPasswordUseCase(
    repository,
    tokenProvider,
    mailProvider
  );

  return { repository, tokenProvider, mailProvider, useCase };
};

describe("Reset password use case", () => {
  test("should send the email with the token correctly", async () => {
    const { repository, tokenProvider, mailProvider, useCase } = getUseCase();

    const user = new UserData(new MockUserData());
    await repository.save(user);
    const redirectURL = "http://www.url.com/target";

    await useCase.execute({ email: user.email, redirectURL });

    expect(tokenProvider.generateToken).toHaveBeenCalled();
    expect(mailProvider.sendMail).toHaveBeenCalled();
  });

  test("should throw when trying to reset a password of a non existing user", async () => {
    const { useCase } = getUseCase();

    const user = { email: "email@email.com" };
    const redirectURL = "http://www.url.com/target";

    await expect(
      useCase.execute({ email: user.email, redirectURL })
    ).rejects.toThrow();
  });
});
