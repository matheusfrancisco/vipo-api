import MockUserData from "@domain/user/mocks/mock-user-data";
import UserData from "./user-data";

describe("UserData", () => {
  it("should create the user correctly", () => {
    const fakeUser = new MockUserData();

    const userData = new UserData(fakeUser);

    expect(userData).toBeDefined();
    expect(userData.name).toBe(fakeUser.name);
    expect(userData.lastName).toBe(fakeUser.lastName);
    expect(userData.email).toBe(fakeUser.email);
    expect(userData.birthDate).toBe(fakeUser.birthDate);
    expect(userData.password).toBe(fakeUser.password);
    expect(userData.gender).toBe(fakeUser.gender);
  });
});
