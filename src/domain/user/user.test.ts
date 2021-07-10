import MockUserData from "@domain/user/mocks/mock-user-data";
import UserData from "./user-data";

describe("UserData", () => {
  it("should create the user correctly", () => {
    const fakeUser = new MockUserData();

    const userData = new UserData(fakeUser);

    expect(userData).toBeDefined();
    expect(userData.name).toBe(fakeUser.name);
    expect(userData.lastname).toBe(fakeUser.lastname);
    expect(userData.email).toBe(fakeUser.email);
    expect(userData.birthdate).toBe(fakeUser.birthdate);
    expect(userData.password).toBe(fakeUser.password);
    expect(userData.gender).toBe(fakeUser.gender);
  });

  it("should throw if the email is invalid", () => {
    const fakeUser = new MockUserData({ email: "invalid email" });

    expect(() => new UserData(fakeUser)).toThrow();
  });
});
