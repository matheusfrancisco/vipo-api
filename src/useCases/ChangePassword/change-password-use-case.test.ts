import MockUserData from "@domain/user/mocks/mock-user-data";
import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import UserData from "@domain/user/user-data";
import MockHashProvider from "@providers/HashProvider/mocks/MockHashProvider";
import IChangePasswordDTO from "./change-password-dto";
import { ChangePasswordUseCase } from "./change-password-use-case";

const makeFakeUseCase = () => {
  const repository = new MockUserRepository();
  const provider = new MockHashProvider();

  const useCase = new ChangePasswordUseCase(repository, provider);

  return { repository, provider, useCase };
};

describe("ChangePasswordUseCase", () => {
  it("should update the user password", async () => {
    const { repository, provider, useCase } = makeFakeUseCase();

    const mockedUser = new MockUserData();
    const hashedPassword = await provider.generateHash(mockedUser.password);
    const user = await repository.save(
      new UserData({
        ...mockedUser,
        password: hashedPassword
      })
    );

    const payload: IChangePasswordDTO = {
      userId: user.id,
      dbPasswordHash: hashedPassword,
      password: user.password,
      newPassword: "new-password"
    };

    const updatedUser = await useCase.execute(payload);

    expect(provider.hashesMatch).toHaveBeenCalledWith(
      payload.dbPasswordHash,
      payload.password
    );
    expect(provider.generateHash).toHaveBeenCalledWith(payload.newPassword);
    expect(updatedUser.password).toBe("new-password");
  });

  it("should not update the password in case the old password is incorrect", async () => {
    const { repository, useCase } = makeFakeUseCase();

    const mockedUser = new UserData(new MockUserData());
    const user = await repository.save(mockedUser);

    const payload: IChangePasswordDTO = {
      userId: user.id,
      dbPasswordHash: mockedUser.password,
      password: "wrong-old-password",
      newPassword: "new-password"
    };

    await expect(useCase.execute(payload)).rejects.toThrow();
  });

  it("should throw an error if the user does not exist", async () => {
    const { useCase } = makeFakeUseCase();

    const payload: IChangePasswordDTO = {
      userId: 456,
      dbPasswordHash: "old-password",
      password: "wrong-old-password",
      newPassword: "new-password"
    };

    await expect(useCase.execute(payload)).rejects.toThrow();
  });
});
