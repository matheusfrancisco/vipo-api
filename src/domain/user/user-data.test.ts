import MockUserData from "@domain/user/mocks/mock-user-data";
import UserData from "./user-data";

describe("UserData", () => {
  it("should create the user correctly", () => {
    const fakeUser = new MockUserData();

    const userData = new UserData(fakeUser);

    expect(userData).toBeDefined();
    expect(userData).toHaveProperty("name");
    expect(userData).toHaveProperty("lastName");
    expect(userData).toHaveProperty("email");
    expect(userData).toHaveProperty("birthDate");
    expect(userData).toHaveProperty("password");
    expect(userData).toHaveProperty("gender");
    expect(userData).toHaveProperty("resetPasswordToken");
  });

  it("should throw if the email is invalid", () => {
    const fakeUser = new MockUserData({ email: "invalid email" });

    expect(() => new UserData(fakeUser)).toThrow();
  });
});
