import { UserRepository } from "../domain/user/user-repository";
import User from "../domain/user/user";
import { getRepository,  Repository } from "typeorm";
import { UserEntity, Gender } from "./entity/user-entity";
import { PostgresUserRepository } from "./postgres-user-repository";
import { CreateDatabaseConnection } from "./connection";

describe("User Repository", () => {
  let repository: Repository<UserEntity>;
  let connection: any;
  let userRepository: UserRepository;

  beforeEach(async () => {
    connection = await CreateDatabaseConnection.createConnection("test");
    repository = await getRepository(UserEntity);

    userRepository = new PostgresUserRepository(connection);

    repository.delete({});
    jest.setTimeout(60000);

  });

  test("Should save a user", async () => {
    const user = new User({
      name: "Matheus",
      email: "matheus2@hotmaaxil.com",
      password: "123123",
      lastName: "Xico",
      gender: Gender.Male,
      birthDate: new Date('09/09/1994')
    });
    await userRepository.save(user.toRepository());
    const foundUser = await repository.findOne({
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
    connection = await CreateDatabaseConnection.createConnection("test");
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities);
    jest.clearAllMocks(); 
    jest.resetAllMocks();
    
   });
});
