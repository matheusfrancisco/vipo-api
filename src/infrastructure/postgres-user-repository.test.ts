import { UserRepository } from "../domain/user/user-repository";
import User from "../domain/user/user";
import { getRepository,  Repository } from "typeorm";
import { UserEntity } from "./entity/user-entity";
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

    const entities = await connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.delete({})
    });
  });

  it("Should save a user", async () => {
    const user = new User({
      name: "Matheus",
      email: "matheus2@hotmaaxil.com",
      password: "123123"
    });
    await userRepository.save(user);
    const foundUser = await repository.findOne({
      email: "matheus2@hotmaaxil.com"
    });
    expect(foundUser).toMatchObject({
      password: "123123",
      email: "matheus2@hotmaaxil.com"
    });
  });

  afterEach(async () => {
    connection = await CreateDatabaseConnection.getConnection('test');
    if(!connection) {
      connection = await CreateDatabaseConnection.createConnection('test');
    }
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.delete({})
    });
  });
});
