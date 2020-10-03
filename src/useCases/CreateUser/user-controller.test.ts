import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;
import { ServiceError } from "../../service-error";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-use-case";
import { CustomerRepository } from "../../domain/user/user-repository";
import { UserEntity } from "../../infrastructure/entity/user-entity";

describe("CustomerController", () => {
  let execute: sinon.SinonSpy;
  let executeMock: ({
    name,
    email,
    password
  }: Record<string, string>) => Promise<void>;

  let customerController: any;
  let failingCustomerController: any;
  let end: any;
  let send: any;
  let statusReturnMock: any;
  let status: any;
  let resMock: any;
  let json: any;
  let resMockSuccess: any;
  let createCustomertest: any;

  const customerEmail = "matheusmachadoufsc@gmail.com";
  const userName = "xi";
  const userPass = "123123";
  const expectedCustomer = [
    {
      id: 1,
      email: "matheusmachadoufsc@hotmail.com",
      password: "ee65426e-b376-4221-931b-994913e17b73"
    }
  ];
  const req = {
    body: {
      name: userName,
      email: customerEmail,
      password: userPass
    }
  };
  const reqWithoutEmail = { body: { password: userPass } };
  const reqWithoutPass = { body: { email: customerEmail } };

  const customerRepository = {
    save: () => Promise.resolve(),
    findByEmail: (): Promise<UserEntity | undefined> => Promise.resolve()
  };

  const promiseThatThrows = () => {
    throw new Error("Unknown error");
  };

  class CreateUserUseCaseMock extends CreateUserUseCase {
    constructor(
      userRepository: CustomerRepository,
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
    createCustomertest = jest.fn();
    createCustomertest.mockReturnValue({ token: "test", email: "test" });

    executeMock = ({ name, email, password }: Record<string, string>) => {
      return Promise.resolve(execute({ name, email, password }));
    };

    customerController = new CreateUserController(
      new CreateUserUseCaseMock(customerRepository, executeMock)
    );

    failingCustomerController = new CreateUserController(
      new CreateUserUseCaseMock(customerRepository, () => {
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
      const r = await customerController.handle(req, resMockSuccess);
      expect(status).to.have.been.calledWith(201);
      expect(send).to.have.been.called;
    });

    it("Should return status code 400 if email is not present post user", async () => {
      await customerController.handle(reqWithoutEmail, resMock);
      expect(status).to.have.been.calledWith(400);
      // expect(json).to.have.been.calledWith({ error: "Parameters missing" });
    });

    it("Should return status code 400 if pass is not present", async () => {
      await customerController.handle(reqWithoutPass, resMock);
      expect(status).to.have.been.calledWith(400);
      // expect(json).to.have.been.calledWith({ error: "Parameters missing" });
    });

    it("Should return status code 400 if error thrown", async () => {
      await failingCustomerController.handle(req, resMock);
      expect(status).to.have.been.calledWith(400);
      // expect(json).to.have.been.calledWith({ error: "Service error" });
    });

    it("Should return status code 400 if body is empty", async () => {
      await customerController.handle({}, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: "Parameters missing" });
    });
  });
});
