import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

import { Gender } from "../../infrastructure/entity/user-entity";
import { CreateUserUseCase } from "./create-use-case";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const { expect } = chai;

xdescribe("CreateUserUseCase", () => {
  it("should save user with userRepository", async () => {
    const save = sinon.spy();
    const findByEmail = sinon.spy();
    const insertAnswer = sinon.spy();
    const updateUserProfile = sinon.spy();
    const update = sinon.spy();

    const userService = new CreateUserUseCase({
      save,
      findByEmail,
      updateUserProfile,
      insertAnswer,
      update
    });

    await userService.execute({
      name: "x",
      email: "matheusfrancisco@hotmail.com",
      password: "123123",
      lastName: "f",
      birthDate: new Date("09/09/1994"),
      gender: Gender.Male
    });
    expect(save).to.have.been.called;
  });
});
