import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
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

    const mockedUser = new UserData(new MockUserData());
    const user = await repository.save(mockedUser);

    const token = await tokenProvider.generateToken();

    tokenProvider.decodeToken = jest.fn(async _ => ({
      userId: user.id,
      email: user.email
    }));

    // Testing
    await useCase.execute({
      token,
      password: "new-pass"
    });

    const updatedUser = await repository.findByEmail(user.email);

    // Assert
    expect(tokenProvider.decodeToken).toHaveBeenCalled();
    expect(hashProvider.generateHash).toHaveBeenCalled();
    expect(updatedUser?.password).toBe("new-pass");
  });

  test("should throw if decoding the wrong token", async () => {
    const { useCase, repository } = getUseCase();

    const mockedUser = new UserData(new MockUserData());
    await repository.save(mockedUser);

    // Testing
    await expect(
      useCase.execute({
        token: "invalid token",
        password: "new-pass"
      })
    ).rejects.toThrow();
  });

  test("should throw when trying to decode an invalid token", async () => {
    const { tokenProvider, useCase, repository } = getUseCase();

    const mockedUser = new UserData(new MockUserData());
    await repository.save(mockedUser);

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

    const token = await tokenProvider.generateToken();

    tokenProvider.decodeToken = jest.fn(async _ => ({
      userId: 5,
      email: "email@email.com"
    }));

    // Testing
    await expect(
      useCase.execute({
        token,
        password: "new-pass"
      })
    ).rejects.toThrow();
  });

  test("should throw if the user id from the decoded token does not match the found user", async () => {
    const { tokenProvider, useCase, repository } = getUseCase();

    const mockedUser = new UserData(new MockUserData());
    const user = await repository.save(mockedUser);

    const token = await tokenProvider.generateToken();

    tokenProvider.decodeToken = jest.fn(async _ => ({
      userId: user.id + 1,
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
});
