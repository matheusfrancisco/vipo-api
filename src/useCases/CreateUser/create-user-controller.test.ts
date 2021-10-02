import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import MockHashProvider from "@providers/HashProvider/mocks/MockHashProvider";
import MockProfilesRepository from "@domain/profile/mocks/mock-profiles-repository";
import { CreateUserUseCase } from "@useCases/CreateUser/create-user-use-case";
import { CreateUserController } from "@useCases/CreateUser/create-user-controller";
import faker from "faker";
import { Request, Response } from "express";

class MockCreateUserUseCase extends CreateUserUseCase {
  constructor() {
    super(
      new MockUserRepository(),
      new MockProfilesRepository(),
      new MockHashProvider()
    );

    this.execute = jest.fn();
  }
}

const getController = () => {
  const useCase = new MockCreateUserUseCase();

  const controller = new CreateUserController(useCase);

  return { controller, useCase };
};

const fakeBody = {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthDate: faker.date.past(90),
  gender: "Male" as const,
  email: faker.internet.email(),
  password: faker.internet.password()
};

describe("UserController", () => {
  it("Should return status code 201", async () => {
    const { controller } = getController();

    const statusMethod = jest.fn(
      (_: number) =>
        (({
          send: jest.fn()
        } as unknown) as Response)
    );

    await controller.handle(
      { body: fakeBody } as Request,
      ({
        status: statusMethod
      } as unknown) as Response
    );

    expect(statusMethod).toHaveBeenCalledWith(201);
  });

  it("Should return status code 400 if email is not present when posting user", async () => {
    const { controller } = getController();

    const body: Partial<typeof fakeBody> = { ...fakeBody };
    delete body.email;

    await expect(
      controller.handle({ body } as Request, ({} as unknown) as Response)
    ).rejects.toThrow();
  });

  it("Should return status code 400 if password is not present", async () => {
    const { controller } = getController();

    const body: Partial<typeof fakeBody> = { ...fakeBody };
    delete body.password;

    await expect(
      controller.handle({ body } as Request, ({} as unknown) as Response)
    ).rejects.toThrow();
  });

  it("Should return status code 400 if an error is thrown", async () => {
    const { controller, useCase } = getController();

    useCase.execute = jest.fn(async () =>
      Promise.reject(new Error("Custom error"))
    );

    await expect(
      controller.handle(
        { body: fakeBody } as Request,
        ({} as unknown) as Response
      )
    ).rejects.toThrow();
  });

  it("Should return status code 400 if body is empty", async () => {
    const { controller, useCase } = getController();

    useCase.execute = jest.fn(async () =>
      Promise.reject(new Error("Custom error"))
    );

    await expect(
      controller.handle({} as Request, ({} as unknown) as Response)
    ).rejects.toThrow();
  });
});
