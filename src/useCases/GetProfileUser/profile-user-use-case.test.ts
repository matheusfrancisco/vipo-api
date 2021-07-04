import MockProfilesRepository from "@domain/profile/mocks/MockProfilesRepository";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import { ProfileUserUseCase } from "@useCases/GetProfileUser/profile-user-use-case";

describe("Profile User Use Case", () => {
  it("should return undefined when no user exists", async () => {
    const usersRepository = new MockUserRepository();
    const profilesRepository = new MockProfilesRepository();
    const useCase = new ProfileUserUseCase(usersRepository, profilesRepository);

    const email = "my_random_mail@email.com";

    const result = await useCase.execute({ email });

    expect(result).toBeUndefined();
  });

  it("should return the user and its profile correctly", async () => {
    const user = {
      name: "Fake",
      lastName: "Fakerson",
      email: "my_random_mail@email.com",
      birthDate: "15/11/19900",
      gender: "male"
    };

    const profile = {
      drinks: [],
      foods: [],
      musicals: ["something"]
    };

    const usersRepository = new MockUserRepository();
    const profilesRepository = new MockProfilesRepository();
    usersRepository.findByEmail = jest.fn(() => user);
    profilesRepository.findByUser = jest.fn(() => profile);

    const useCase = new ProfileUserUseCase(usersRepository, profilesRepository);

    const result = await useCase.execute({ email: user.email });

    expect(result).toEqual({
      ...user,
      profileInformations: profile
    });
  });
});
