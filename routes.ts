import { Router } from "express";
import { createUseCaseFactory } from "./src/useCases/CreateUser";
import { UpdateUserUseCaseFactory } from "./src/useCases/updateProfile";
import { FindUseCaseFactory } from "./src/useCases/FindUser";
import { createRecommendationUseCaseFactory } from "./src/useCases/CreateRecommendation";
import { Auth } from "./src/middlewares/auth";
import { CreateDatabaseConnection } from "./src/infrastructure/connection";

export const routerFactory = async (config: string = "prod") => {
  const connection = await CreateDatabaseConnection.createConnection(config);

  const {
    createUserController,
    userRepository,
  } = await createUseCaseFactory.build(connection);

  // const { findUserController } = await FindUseCaseFactory.build(connection);
  const { updateUserProfileController } = await UpdateUserUseCaseFactory.build(
    connection
  );

  const {
    createRecommendationController,
  } = await createRecommendationUseCaseFactory.build(connection);

  const auth = await new Auth(userRepository);
  const router = Router();

  router.post("/signin", async (request, response) => {
    // const userProfileInformation = findUserController.handle(request, response);
    // #TODO remove sensitive informations from user
    const r =  await auth.singIn(request, response)
    if (r) {
      return response.status(200).send({
        user: r.body.user,
        token: r.body.token,
      });
    }
  });

  router.post("/users", (request, response) => {
    return createUserController.handle(request, response);
  });

  router.patch("/profile", auth.verify, async (request, response) => {
    return await updateUserProfileController.handle(request, response);
  });

  router.post("/user/recommendation", auth.verify, (request, response) => {
    return createRecommendationController.handle(request, response);
  });

  return router;
};
