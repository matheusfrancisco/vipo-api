import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import MockHashProvider from "@providers/HashProvider/mocks/MockHashProvider";
import MockProfilesRepository from "@domain/profile/mocks/mock-profiles-repository";
import { CreateUserUseCase } from "./create-user-use-case";

describe("CreateUserUseCase", () => {
  it("should save user with userRepository", async () => {
    const repository = new MockUserRepository();
    const repositoryProfile = new MockProfilesRepository();
    const hashProvider = new MockHashProvider();

    const useCase = new CreateUserUseCase(
      repository,
      repositoryProfile,
      hashProvider
    );

    const user = new MockUserData();

    const result = await useCase.execute(user);

    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
    expect(result.lastName).toBe(user.lastName);
    expect(result.birthDate).toBe(user.birthDate);
    expect(result.gender).toBe(user.gender);
  });
});
