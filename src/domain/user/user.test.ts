import User from "./user";

describe("User", () => {
  const name = "Xico";
  const email = "matheusfrancisco@hotmail.com";
  const password = "123123";
  const user = new User({ name, email, password });

  it("has a taxpayerRegistry", () => {
    expect(user.email.value).toEqual(email);
  });

  it("has a pass", () => {
    expect(user.password).toEqual(password);
  });
});
