import { UserRepository } from "src/domain/user/user-repository";
import IUpdateUserDTO from "./update-user-dto";
import { UpdateUserUseCase } from "./update-user-use-case";

describe("UpdateUserUseCase", () => {
  it("should update the user via the users repository", async () => {
    const fakeRepository: UserRepository = {
      findByEmail: jest.fn(),
      insertAnswer: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      updateUserProfile: jest.fn()
    };

    const updateUser = new UpdateUserUseCase(fakeRepository);

    const values: IUpdateUserDTO = {
      userId: 5000,
      name: "Kratos",
      lastName: "Zeusson"
    };

    await updateUser.execute(values);

    expect(fakeRepository.update).toHaveBeenCalledWith(values);
  });
});
