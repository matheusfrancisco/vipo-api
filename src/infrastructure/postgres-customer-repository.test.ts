import { CustomerRepository } from "../domain/user/user-repository";
import User from "../domain/user/user";
import { getRepository, createConnection, Repository } from "typeorm";
import { UserEntity } from "./entity/user-entity";
import { PostgresCustomerRepository } from "./postgres-customer-repository";

describe("Customer Repository", () => {
  let repository: Repository<UserEntity>;
  let connection: any;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    connection = await createConnection();
    repository = getRepository(UserEntity);

    // await repository.delete({});
    customerRepository = new PostgresCustomerRepository(connection);
  });

  it("Should save a customer", async () => {
    const user = new User({
      name: "Matheus",
      email: "matheus@hotmaaxil.com",
      password: "123123"
    });
    await customerRepository.save(user);
    const foundCustomer = await repository.findOne({
      email: "matheus@hotmaaxil.com"
    });
    expect(foundCustomer).toMatchObject({
      password: "123123",
      email: "matheus@hotmaaxil.com"
    });
  });

  afterEach(async () => {
    // await repository.delete({});
    connection.close();
  });
});
