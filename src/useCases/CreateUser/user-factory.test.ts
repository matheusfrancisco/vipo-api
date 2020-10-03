import { CustomerRepository } from "../../domain/user/user-repository";
import { createUseCaseFactory } from ".";
import { PostgresCustomerRepository } from "../../infrastructure/postgres-customer-repository";

describe("Fintop Factory", () => {
  it("Should build application in production mode", async () => {
    const container = await createUseCaseFactory.build();
    const controller = container.userController as any;
    const repository = container.userRepository as CustomerRepository;

    expect(repository).toBeInstanceOf(PostgresCustomerRepository);
    expect(container.userRepository).toBeInstanceOf(PostgresCustomerRepository);
  });
});
