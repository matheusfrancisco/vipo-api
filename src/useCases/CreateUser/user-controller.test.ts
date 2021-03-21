import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceError } from "../../service-error";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-use-case";
import { IUserRepository } from "../../domain/user/user-repository";
import { UserEntity } from "../../infrastructure/entity/user-entity";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const { expect } = chai;

describe("UserController", () => {
  let execute: sinon.SinonSpy;
  let executeMock: ({
    name,
    email,
    password
  }: Record<string, string>) => Promise<void>;

  let userController: any;
  let failingUserController: any;
  let end: any;
  let send: any;
  let statusReturnMock: any;
  let status: any;
  let resMock: any;
  let json: any;
  let resMockSuccess: any;
  let createUserControllerTest: any;

  const userEmail = "matheusmachadoufsc@gmail.com";
  const userName = "xi";
  const lastName = "Franxico";
  const bday = new Date("09/09/1994");
  const gender = "Male";
  const userPass = "123123";

  const req = {
    body: {
      name: userName,
      email: userEmail,
      password: userPass,
      lastName,
      birthDate: bday,
      gender
    }
  };
  const reqWithoutEmail = { body: { password: userPass } };
  const reqWithoutPass = { body: { email: userEmail } };

  const userRepository = {
    save: () => Promise.resolve(),
    findByEmail: (): Promise<UserEntity | undefined> => Promise.resolve()
  };

  const promiseThatThrows = () => {
    throw new Error("Unknown error");
  };

  class CreateUserUseCaseMock extends CreateUserUseCase {
    constructor(
      userRepository: IUserRepository,
      execute: ({
        name,
        email,
        password
      }: Record<string, string>) => Promise<void>
    ) {
      super(userRepository);
      this.execute = execute;
    }
  }

  beforeEach(() => {
    execute = sinon.spy();
    createUserControllerTest = jest.fn();
    createUserControllerTest.mockReturnValue({ token: "test", email: "test" });

    executeMock = ({ name, email, password }: Record<string, string>) => {
      return Promise.resolve(execute({ name, email, password }));
    };

    userController = new CreateUserController(
      new CreateUserUseCaseMock(userRepository, executeMock)
    );

    failingUserController = new CreateUserController(
      new CreateUserUseCaseMock(userRepository, () => {
        throw new ServiceError("Service error");
      })
    );

    send = sinon.spy();
    end = sinon.spy();
    json = sinon.spy();
    statusReturnMock = { end, json, send };
    status = sinon.spy(() => statusReturnMock);
    resMock = { status };
    resMockSuccess = { status };
  });

  describe("POST userController.handle", () => {
    it("Should return status code 201", async () => {
      const r = await userController.handle(req, resMockSuccess);
      expect(status).to.have.been.calledWith(201);
      expect(send).to.have.been.called;
    });

    it("Should return status code 400 if email is not present post user", async () => {
      await userController.handle(reqWithoutEmail, resMock);
      expect(status).to.have.been.calledWith(400);
      // expect(json).to.have.been.calledWith({ error: "Parameters missing" });
    });

    it("Should return status code 400 if pass is not present", async () => {
      await userController.handle(reqWithoutPass, resMock);
      expect(status).to.have.been.calledWith(400);
      // expect(json).to.have.been.calledWith({ error: "Parameters missing" });
    });

    it("Should return status code 400 if error thrown", async () => {
      await failingUserController.handle(req, resMock);
      expect(status).to.have.been.calledWith(400);
      // expect(json).to.have.been.calledWith({ error: "Service error" });
    });

    it("Should return status code 400 if body is empty", async () => {
      await userController.handle({}, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: "Parameters missing" });
    });
  });
});
