import { UserRepository } from "../../domain/user/user-repository";
import { createUseCaseFactory } from ".";
import { PostgresUserRepository } from "../../infrastructure/postgres-user-repository";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("Vipo API Factory", () => {
  it("Should build application in production mode", async () => {
    const connection = await CreateDatabaseConnection.createConnection("test");

    const container = await createUseCaseFactory.build(connection);
    const controller = container.createUserController as any;
    const repository = container.userRepository as UserRepository;

    expect(repository).toBeInstanceOf(PostgresUserRepository);
    expect(container.userRepository).toBeInstanceOf(PostgresUserRepository);
  });
});
