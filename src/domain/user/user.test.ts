import MockProfile from "@domain/profile/mocks/mock-profile";
import Profile from "@domain/profile/profile";
import MockUserData from "@domain/user/mocks/mock-user-data";
import User from "@domain/user/user";
import faker from "faker";
import UserData from "./user-data";

describe("UserData", () => {
  it("should create the user correctly", () => {
    const fakeUser = new MockUserData();
    const fakeProfile = new MockProfile();

    const userData = new UserData(fakeUser);
    const profile = new Profile(fakeProfile);

    const user = new User(
      { ...userData, id: faker.random.number() },
      { ...profile, id: faker.random.number(), user: null as any }
    );

    expect(user).toBeDefined();
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("lastName");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("birthDate");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("gender");
    expect(user).toHaveProperty("resetPasswordToken");
    expect(user).toHaveProperty("profile");
    expect(user.profile).toHaveProperty("id");
    expect(user.profile).toHaveProperty("foods");
    expect(user.profile).toHaveProperty("drinks");
    expect(user.profile).toHaveProperty("musicals");
  });
});
