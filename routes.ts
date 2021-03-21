import { Router } from "express";
import { ChangePasswordUseCaseFactory } from "@useCases/ChangePassword";
import { LogUserUseCaseFactory } from "@useCases/LogUser";
import { UpdateUserUseCaseFactory } from "./src/useCases/UpdateUser";
import { CreateUseCaseFactory } from "./src/useCases/CreateUser";
import { GetProfileUserUseCaseFactory } from "./src/useCases/GetProfileUser";
import { UpdateUserProfileUseCaseFactory } from "./src/useCases/updateProfile";
import { createRecommendationUseCaseFactory } from "./src/useCases/CreateRecommendation";
import { Auth } from "./src/middlewares/auth";
import { CreateDatabaseConnection } from "./src/infrastructure/connection";

export const routerFactory = async (): Promise<Router> => {
  const connection = await CreateDatabaseConnection.createConnection();

  const {
    createUserController,
    userRepository
  } = await CreateUseCaseFactory.build(connection);

  const { changePasswordController } = await ChangePasswordUseCaseFactory.build(
    connection
  );

  // const { findUserController } = await FindUseCaseFactory.build(connection);

  const { profileUserController } = GetProfileUserUseCaseFactory.build(
    connection
  );

  const { logUserController } = LogUserUseCaseFactory.build(connection);

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
    return logUserController.handle(request, response);
  });

  router.post("/users", (request, response) => {
    return createUserController.handle(request, response);
  });

  router.patch("/users/password", auth.verify, async (request, response) => {
    return changePasswordController.handle(request, response);
  });

  router.patch("/users", auth.verify, async (request, response) => {
    return updateUserController.handle(request, response);
  });

  router.get("/profile", auth.verify, (request, response) => {
    return profileUserController.handle(request, response);
  });

  router.patch("/profile", auth.verify, async (request, response) => {
    return updateUserProfileController.handle(request, response);
  });

  router.post("/user/recommendation", auth.verify, (request, response) => {
    return createRecommendationController.handle(request, response);
  });

  return router;
};
