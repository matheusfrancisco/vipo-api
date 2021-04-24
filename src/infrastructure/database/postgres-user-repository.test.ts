import { getRepository } from "typeorm";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import User, { Gender } from "@domain/user/user";
import { PostgresUserRepository } from "./postgres-user-repository";

describe("User Repository", () => {
  beforeEach(async () => {
    await CreateDatabaseConnection.createConnection();

    jest.setTimeout(60000);
  });

  test("Should save a user", async () => {
    const userRepository = new PostgresUserRepository();

    const user = new User({
      name: "Matheus",
      email: "matheus2@hotmaaxil.com",
      password: "123123",
      lastName: "Xico",
      gender: Gender.Male,
      birthDate: new Date("09/09/1994")
    });

    await userRepository.save(user.toRepository());

    const foundUser = await getRepository(UserEntity).findOne({
      email: "matheus2@hotmaaxil.com"
    });

    expect(foundUser).toMatchObject({
      password: "123123",
      email: "matheus2@hotmaaxil.com",
      lastName: "Xico",
      gender: "male"
    });
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
