import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import MockHashProvider from "@providers/HashProvider/mocks/MockHashProvider";
import MockTokenProvider from "@providers/TokenProvider/mocks/MockTokenProvider";
import { CreateNewPasswordUseCase } from "@useCases/CreateNewPassword/create-new-password-use-case";

const getUseCase = () => {
  const repository = new MockUserRepository();
  const tokenProvider = new MockTokenProvider();
  const hashProvider = new MockHashProvider();

  const useCase = new CreateNewPasswordUseCase(
    repository,
    tokenProvider,
    hashProvider
  );

  return { repository, tokenProvider, hashProvider, useCase };
};

describe("Create new password use case", () => {
  test("should create the new password correctly", async () => {
    const { repository, tokenProvider, hashProvider, useCase } = getUseCase();

    // Setup
    const user = {
      id: 5,
      email: "email@email.com"
    };

    const token = await tokenProvider.generateToken();

    tokenProvider.decodeToken = jest.fn(async token => ({
      userId: user.id,
      email: user.email
    }));

    repository.findByEmail = jest.fn(async () => user);

    // Testing
    await useCase.execute({
      token,
      password: "new-pass"
    });

    // Assert
    expect(tokenProvider.decodeToken).toHaveBeenCalled();
    expect(repository.findByEmail).toHaveBeenCalled();
    expect(hashProvider.generateHash).toHaveBeenCalled();
    expect(repository.update).toHaveBeenCalled();
  });

  test("should throw if decoding the wrong token", async () => {
    const { useCase } = getUseCase();
    // Testing
    await expect(
      useCase.execute({
        token: "invalid token",
        password: "new-pass"
      })
    ).rejects.toThrow();
  });

  test("should throw when trying to decode an invalid token", async () => {
    const { tokenProvider, useCase } = getUseCase();

    const token = await tokenProvider.generateToken();

    // Testing
    await expect(
      useCase.execute({
        token,
        password: "new-pass"
      })
    ).rejects.toThrow();
  });

  test("should throw when the user does not exist", async () => {
    const { tokenProvider, useCase } = getUseCase();

    // Setup
    const user = {
      id: 5,
      email: "email@email.com"
    };

    const token = await tokenProvider.generateToken();

    tokenProvider.decodeToken = jest.fn(async token => ({
      userId: user.id,
      email: user.email
    }));

    // Testing
    await expect(
      useCase.execute({
        token,
        password: "new-pass"
      })
    ).rejects.toThrow();
  });

  test(
    "should throw when the user from the email is not the user from the token", , async () => {
      const { tokenProvider, useCase } = getUseCase();

      // Setup
      const user = {
        id: 5,
        email: "email@email.com"
      };

      const token = await tokenProvider.generateToken();

      tokenProvider.decodeToken = jest.fn(async token => ({
        userId: 10,
        email: 'wrong@email.com'
      }));

      // Testing
      await expect(
        useCase.execute({
          token,
          password: "new-pass"
        })
      ).rejects.toThrow();
    }
  );
});
