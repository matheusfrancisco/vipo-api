import User, { Gender } from "./user";

describe("User", () => {
  const name = "Xico";
  const email = "matheusfrancisco@hotmail.com";
  const password = "123123";
  const gender = "Male";
  const lastName = "Ma";
  const birthDate = new Date("09/09/1994");
  const user = new User({
    name,
    email,
    password,
    gender: Gender[gender],
    birthDate,
    lastName
  });

  // #TODO write test to guardian and validate inputs (gender, bday, .. )
  it("has a build class", () => {
    expect(user.email.value).toEqual(email);
    expect(user.gender).toEqual("male");
  });

  it("has a pass", () => {
    expect(user.password).toEqual(password);
  });
});
