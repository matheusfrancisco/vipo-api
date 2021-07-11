import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
import MockGoogleProvider from "@providers/GoogleProvider/mocks/MockGoogleProvider";
import MockTokenProvider from "@providers/TokenProvider/mocks/MockTokenProvider";
import { SignWithGoogleUseCase } from "@useCases/SignWithGoogleUseCase/sign-with-google-use-case";

const getUseCase = () => {
  const repository = new MockUserRepository();
  const tokenProvider = new MockTokenProvider();
  const googleProvider = new MockGoogleProvider();

  const useCase = new SignWithGoogleUseCase(
    repository,
    googleProvider,
    tokenProvider
  );

  return { useCase, repository, googleProvider };
};

describe("Sign with google use case", () => {
  test("should create a new user and login", async () => {
    const { useCase, googleProvider } = getUseCase();

    const user = new UserData(new MockUserData());
    googleProvider.getUserLoginData = jest.fn(async () => ({
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      id: "random-id"
    }));

    const result = await useCase.execute("random-token");

    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user).toHaveProperty("name");
    expect(result.user).toHaveProperty("lastName");
    expect(result.user).toHaveProperty("email");
    expect(result.user).toHaveProperty("gender");
    expect(result.user).not.toHaveProperty("password");
  });

  test("should login with an existing user", async () => {
    const { useCase, repository, googleProvider } = getUseCase();

    const user = new UserData(new MockUserData());
    await repository.save(user);

    googleProvider.getUserLoginData = jest.fn(async () => ({
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      id: "random-id"
    }));

    const result = await useCase.execute("random-token");

    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user).toHaveProperty("name");
    expect(result.user).toHaveProperty("lastName");
    expect(result.user).toHaveProperty("email");
    expect(result.user).toHaveProperty("gender");
    expect(result.user).not.toHaveProperty("password");
    expect(repository.findByEmail).toHaveBeenCalled();
  });

  test("should throw when providing an invalid google token", async () => {
    const { useCase, googleProvider } = getUseCase();

    googleProvider.getUserLoginData = jest.fn(async () => {
      throw new Error("invalid");
    });

    await expect(useCase.execute("random-token")).rejects.toThrow();
    expect(googleProvider.getUserLoginData).toHaveBeenCalled();
  });
});
