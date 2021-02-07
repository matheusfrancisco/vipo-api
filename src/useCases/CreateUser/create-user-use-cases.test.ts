import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

import { CreateUserUseCase } from "./create-use-case";
import { Gender } from "src/infrastructure/entity/user-entity";

xdescribe("CreateUserUseCase", () => {

  it("should save user with userRepository", async () => {
    const save = sinon.spy();
    const findByEmail = sinon.spy();
    const insertAnswer = sinon.spy();
    const updateUserProfile = sinon.spy();

    const userService = new CreateUserUseCase(
      { save, findByEmail, updateUserProfile, insertAnswer }
    );

    await userService.execute({
      name: "x",
      email: "matheusfrancisco@hotmail.com",
      password: "123123",
      lastName: "f",
      birthDate: new Date("09/09/1994"),
      gender: Gender.Male,
    });
    expect(save).to.have.been.called;
  });
});
