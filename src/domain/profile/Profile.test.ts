import MockProfile from "@domain/profile/mocks/mock-profile";
import Profile from "@domain/profile";

describe("Profile", () => {
  it("should instantiate the object correctly", () => {
    const profile = new Profile(new MockProfile());

    expect(profile).toHaveProperty("user");
    expect(profile).toHaveProperty("drinks");
    expect(profile).toHaveProperty("foods");
    expect(profile).toHaveProperty("musicals");
  });
});
