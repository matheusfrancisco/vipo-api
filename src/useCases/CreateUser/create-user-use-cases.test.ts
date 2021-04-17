import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import { Gender } from "@domain/user/user";
import MockHashProvider from "@providers/HashProvider/mocks/MockHashProvider";
import { CreateUserUseCase } from "./create-use-case";

xdescribe("CreateUserUseCase", () => {
  it("should save user with userRepository", async () => {
    const repository = new MockUserRepository();
    const hashProvider = new MockHashProvider();

    const userService = new CreateUserUseCase(repository, hashProvider);

    await userService.execute({
      name: "x",
      email: "matheusfrancisco@hotmail.com",
      password: "123123",
      lastName: "f",
      birthDate: new Date("09/09/1994"),
      gender: Gender.Male
    });

    expect(repository.save).toHaveBeenCalled();
  });
});
