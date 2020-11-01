import { CustomerRepository } from "../domain/user/user-repository";
import User from "../domain/user/user";
import { getRepository,  Repository } from "typeorm";
import { UserEntity } from "./entity/user-entity";
import { PostgresCustomerRepository } from "./postgres-customer-repository";
import { CreateDatabaseConnection } from "./connection";

describe("Customer Repository", () => {
  let repository: Repository<UserEntity>;
  let connection: any;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    connection = await CreateDatabaseConnection.createConnection("test");
    repository = getRepository(UserEntity);

    customerRepository = new PostgresCustomerRepository(connection);
    connection = await CreateDatabaseConnection.getConnection('test');

    const entities = connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  });

  it("Should save a customer", async () => {
    const user = new User({
      name: "Matheus",
      email: "matheus2@hotmaaxil.com",
      password: "123123"
    });
    await customerRepository.save(user);
    const foundCustomer = await repository.findOne({
      email: "matheus2@hotmaaxil.com"
    });
    expect(foundCustomer).toMatchObject({
      password: "123123",
      email: "matheus2@hotmaaxil.com"
    });
  });

  afterEach(async () => {
    connection = await CreateDatabaseConnection.getConnection('test');

    const entities = connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
    connection.close();
  });
});
