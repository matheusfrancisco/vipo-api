import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

import { CreateUserUseCase } from "./create-use-case";

describe("CreateUserUseCase", () => {
  it("should save user with userRepository", async () => {
    const save = sinon.spy();
    const findByEmail = sinon.spy();

    const userService = new CreateUserUseCase({ save, findByEmail });

    await userService.execute({
      name: "x",
      email: "matheusfrancisco@hotmail.com",
      password: "123123"
    });
    expect(save).to.have.been.called;
  });
});
