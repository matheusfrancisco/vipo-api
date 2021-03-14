import MockUserRepository from "@domain/user/mocks/mock-user-repository";
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

    const payload: IChangePasswordDTO = {
      userId: 456,
      dbPasswordHash: "old-password",
      password: "old-password",
      newPassword: "new-password"
    };

    await useCase.execute(payload);

    expect(repository.update).toHaveBeenCalled();
    expect(provider.hashesMatch).toHaveBeenCalledWith(
      payload.dbPasswordHash,
      payload.password
    );
    expect(provider.generateHash).toHaveBeenCalledWith(payload.newPassword);
  });

  it("should not update the password in case the old password is incorrect", async () => {
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
