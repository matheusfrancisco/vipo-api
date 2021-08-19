import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
import MockHashProvider from "@providers/HashProvider/mocks/MockHashProvider";
import MockTokenProvider from "@providers/TokenProvider/mocks/MockTokenProvider";
import { LogUserUseCase } from "@useCases/LogUser/log-user-use-case";

const getUseCase = () => {
  const repository = new MockUserRepository();
  const tokenProvider = new MockTokenProvider();
  const hashProvider = new MockHashProvider();

  const useCase = new LogUserUseCase(repository, tokenProvider, hashProvider);

  return { repository, hashProvider, useCase };
};

describe("Log User Use Case", () => {
  test("it should login a user correctly", async () => {
    const { repository, useCase } = getUseCase();

    const user = new UserData(new MockUserData());
    await repository.save(user);

    const result = await useCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user).toHaveProperty("name");
    expect(result.user).toHaveProperty("lastName");
    expect(result.user).toHaveProperty("email");
    expect(result.user).toHaveProperty("gender");
    expect(result.user).not.toHaveProperty("password");
  });

  test("it should throw when trying to login a user that does not exist", async () => {
    const { useCase } = getUseCase();

    await expect(
      useCase.execute({ email: "invalid-email", password: "invalid-password" })
    ).rejects.toThrow();
  });

  test("it should throw when trying to log with an invalid password", async () => {
    const { repository, hashProvider, useCase } = getUseCase();

    const user = new UserData(new MockUserData());
    await repository.save(user);

    await expect(
      useCase.execute({ email: user.email, password: "invalid-password" })
    ).rejects.toThrow();

    expect(hashProvider.hashesMatch).toHaveBeenCalled();
  });
});
