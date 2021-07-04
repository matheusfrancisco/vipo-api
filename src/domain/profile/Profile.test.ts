import MockProfile from "@domain/profile/mocks/MockProfile";
import Profile from "@domain/profile/Profile";

describe("Profile", () => {
  it("should instantiate the object correctly", () => {
    const profile = new Profile(new MockProfile());

    expect(profile).toHaveProperty("user");
    expect(profile).toHaveProperty("drinks");
    expect(profile).toHaveProperty("foods");
    expect(profile).toHaveProperty("musicals");
  });
});
