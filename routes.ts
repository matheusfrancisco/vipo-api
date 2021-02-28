import { Router } from "express";
import { UpdateUserUseCaseFactory } from "./src/useCases/UpdateUser";
import { createUseCaseFactory } from "./src/useCases/CreateUser";
import { UpdateUserProfileUseCaseFactory } from "./src/useCases/updateProfile";
import { createRecommendationUseCaseFactory } from "./src/useCases/CreateRecommendation";
import { Auth } from "./src/middlewares/auth";
import { CreateDatabaseConnection } from "./src/infrastructure/connection";

export const routerFactory = async (): Promise<Router> => {
  const connection = await CreateDatabaseConnection.createConnection();

  const {
    createUserController,
    userRepository
  } = await createUseCaseFactory.build(connection);

  // const { findUserController } = await FindUseCaseFactory.build(connection);
  const {
    updateUserProfileController
  } = await UpdateUserProfileUseCaseFactory.build(connection);

  const { updateUserController } = await UpdateUserUseCaseFactory.build(
    connection
  );

  const {
    createRecommendationController
  } = await createRecommendationUseCaseFactory.build(connection);

  const auth = await new Auth(userRepository);
  const router = Router();

  router.post("/signin", async (request, response) => {
    // const userProfileInformation = findUserController.handle(request, response);
    // #TODO remove sensitive informations from user
    const r = await auth.singIn(request, response);
    if (r) {
      return response.status(200).send({
        user: r.body.user,
        token: r.body.token
      });
    }

    // #TODO remake this endpoint to return the correct information for the user
    return response.end();
  });

  router.post("/users", (request, response) => {
    return createUserController.handle(request, response);
  });

  router.patch("/users", async (request, response) => {
    return updateUserController.handle(request, response);
  });

  router.patch("/profile", auth.verify, async (request, response) => {
    return updateUserProfileController.handle(request, response);
  });

  router.post("/user/recommendation", auth.verify, (request, response) => {
    return createRecommendationController.handle(request, response);
  });

  return router;
};
