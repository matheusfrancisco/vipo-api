import { getRepository } from "typeorm";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import MockUserData from "@domain/user/mocks/mock-user-data";
import UserData from "@domain/user/user-data";
import { PostgresUserRepository } from "./postgres-user-repository";

const saveMockedUser = async () => {
  const userRepository = new PostgresUserRepository();

  const user = new UserData(new MockUserData());

  return userRepository.save(user);
};

describe("User Repository", () => {
  beforeEach(async () => {
    await CreateDatabaseConnection.createConnection();

    jest.setTimeout(60000);
  });

  it("should save a user", async () => {
    const userRepository = new PostgresUserRepository();

    const user = new UserData(new MockUserData());

    await userRepository.save(user);

    const foundUser = await getRepository(UserEntity).findOne({
      email: user.email
    });

    expect(foundUser).toMatchObject({
      password: user.password,
      email: user.email,
      lastName: user.lastName,
      gender: user.gender
    });
  });

  it("should return a user by its email", async () => {
    const user = await saveMockedUser();

    const userRepository = new PostgresUserRepository();
    const foundUser = await userRepository.findByEmail(user.email);

    expect(foundUser).toEqual(user);
  });

  it("should update the users reset token", async () => {
    const user = await saveMockedUser();

    const userRepository = new PostgresUserRepository();
    const token = "random-token";
    const updatedUser = await userRepository.updateResetPasswordToken(
      user.id,
      token
    );

    expect(updatedUser.resetPasswordToken).toBe(token);
  });

  it("should update the user correctly", async () => {
    const user = await saveMockedUser();

    const userRepository = new PostgresUserRepository();
    const newUserData = new MockUserData();

    const updatedUser = await userRepository.update({
      userId: user.id,
      name: newUserData.name,
      lastName: newUserData.lastName,
      password: newUserData.password
    });

    expect(updatedUser.name).toBe(newUserData.name);
    expect(updatedUser.lastName).toBe(newUserData.lastName);
    expect(updatedUser.password).toBe(newUserData.password);
    expect(updatedUser.birthDate).toEqual(user.birthDate);
    expect(updatedUser.email).toBe(user.email);
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
