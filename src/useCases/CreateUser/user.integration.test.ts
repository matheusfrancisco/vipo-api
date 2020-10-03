/* Fix test create integration 
create server.ts to use in test */

import { createUseCaseFactory } from ".";
// import { factoryServer } from "../../../index";
import request from "supertest";
import { getRepository } from "typeorm";
import { UserEntity } from "../../infrastructure/entity/user-entity";

xdescribe("integratoin test", () => {
  let server: any;
  let connection: any;
  let repositoryCustomerTest: any;

  beforeEach(async () => {
    // let { userRepository, userController } = await createUseCaseFactory.build("prod");

    // server = factoryServer({
    //   customerController,
    //   authController
    // });

    connection = createUseCaseFactory.getConnection();
    repositoryCustomerTest = getRepository(UserEntity);
    await repositoryCustomerTest.delete({});
  });

  afterEach(async () => {
    await repositoryCustomerTest.delete({});
  });

  it("should register a user", async () => {
    const res = await request(server)
      .post("/api/v1/user")
      .send({
        name: "mt",
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });

    expect(res.body).toEqual({ message: "sucess" });
    expect(res.status).toEqual(200);
  });
});
