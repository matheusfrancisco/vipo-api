import MockProfile from "@domain/profile/mocks/MockProfile";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import PostgresProfilesRepository from "@infrastructure/database/repositories/postgres-profiles-repository";

xdescribe("Postgres Profiles Repository", () => {
  beforeEach(async () => {
    await CreateDatabaseConnection.createConnection();

    jest.setTimeout(60000);
  });

  it("should create a new profile", async () => {
    const repository = new PostgresProfilesRepository();

    const newProfile = new MockProfile();

    const profile = await repository.createOrUpdateOne(newProfile);
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
