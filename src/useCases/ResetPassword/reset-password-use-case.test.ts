import MockUserRepository from "@domain/user/mocks/mock-user-repository";
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

    const user = { id: 1, email: "email@email.com" };
    const redirectURL = "http://www.url.com/target";

    repository.findByEmail = jest.fn(async () => user);

    await useCase.execute({ email: user.email, redirectURL });

    expect(repository.findByEmail).toHaveBeenCalled();
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
