import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import IUpdateUserDTO from "./update-user-dto";
import { UpdateUserUseCase } from "./update-user-use-case";

describe("UpdateUserUseCase", () => {
  it("should update the user via the users repository", async () => {
    const fakeRepository = new MockUserRepository();

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
