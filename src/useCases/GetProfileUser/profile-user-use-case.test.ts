import MockProfile from "@domain/profile/mocks/mock-profile";
import MockProfilesRepository from "@domain/profile/mocks/mock-profiles-repository";
import Profile from "@domain/profile";
import { IUser} from "@domain/user/IUser";
import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
import { ProfileUserUseCase } from "@useCases/GetProfileUser/profile-user-use-case";

const getUseCase = () => {
  const usersRepository = new MockUserRepository();
  const profilesRepository = new MockProfilesRepository();
  const useCase = new ProfileUserUseCase(usersRepository, profilesRepository);

  return { usersRepository, profilesRepository, useCase };
};

describe("Profile User Use Case", () => {
  it("should return undefined when no user exists", async () => {
    const { useCase } = getUseCase();

    const email = "my_random_mail@email.com";

    const result = await useCase.execute({ email });

    expect(result).toBeUndefined();
  });

  it("should return the user and its profile correctly", async () => {
    const { useCase, usersRepository, profilesRepository } = getUseCase();

    const mockUser = new UserData(new MockUserData());
    const user = await usersRepository.save(mockUser);

    const mockProfile = new Profile(new MockProfile({ user: user.id }));
    const profile = await profilesRepository.save(mockProfile);

    const result = await useCase.execute({ email: user.email });

    expect(result).toEqual<IUser>({
      ...user,
      profile: {
        id: profile.id,
        drinks: profile.drinks,
        foods: profile.foods,
        musicals: profile.musicals
      }
    });
  });
});
