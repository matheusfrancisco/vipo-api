import MockProfile from "@domain/profile/mocks/mock-profile";
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

    const profile = await repository.save(newProfile);

    expect(profile.foods).toEqual(newProfile.foods);
    expect(profile.musicals).toEqual(newProfile.musicals);
    expect(profile.drinks).toEqual(newProfile.drinks);
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
