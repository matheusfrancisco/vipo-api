import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
import { UpdateUserUseCase } from "./update-user-use-case";

describe("UpdateUserUseCase", () => {
  it("should update the user via the users repository", async () => {
    const repository = new MockUserRepository();

    const useCase = new UpdateUserUseCase(repository);

    const mockUser = new UserData(new MockUserData());
    const originalUser = await repository.save(mockUser);

    const newMockUser = new MockUserData();

    const updatedUser = await useCase.execute({
      userId: originalUser.id,
      name: newMockUser.name,
      lastName: newMockUser.lastName
    });

    expect(updatedUser).toEqual({
      ...originalUser,
      name: newMockUser.name,
      lastName: newMockUser.lastName
    });
  });
});
