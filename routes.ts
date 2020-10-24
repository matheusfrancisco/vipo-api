import { Router } from "express";
import { createUseCaseFactory } from "./src/useCases/CreateUser";
import { FindUseCaseFactory } from "./src/useCases/FindUser";
import { Auth } from "./src/middlewares/auth";
import { CreateDatabaseConnection } from "./src/infrastructure/connection";

export const routerFactory = async (config: string = "prod") => {
  const connection = await CreateDatabaseConnection.createConnection();

  const {
    createUserController,
    userRepository
  } = await createUseCaseFactory.build(connection);

  // const { findUserController } = await FindUseCaseFactory.build(connection);

  const auth = await new Auth(userRepository);
  const router = Router();

  router.get("/signin", auth.singIn, (request, response) => {
    // const userProfileInformation = findUserController.handle(request, response);
    // #TODO remove sensitive informations from user
    return response.status(200).send({
      user: request.body.user,
      token: request.body.token
    });
  });

  router.post("/users", (request, response) => {
    return createUserController.handle(request, response);
  });

  return router;
};
