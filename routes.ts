import { Router } from "express";
import { ChangePasswordUseCaseFactory } from "@useCases/ChangePassword";
import { LogUserUseCaseFactory } from "@useCases/LogUser";
import ensureAuthenticated from "@middlewares/ensureAuthenticated";
import { SignWithGoogleUseCaseFactory } from "@useCases/SignWithGoogleUseCase";
import { ResetPasswordUseCaseFactory } from "@useCases/ResetPassword";
import { CreateNewPasswordUseCaseFactory } from "@useCases/CreateNewPassword";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { UpdateUserUseCaseFactory } from "@useCases/UpdateUser";
import { CreateUseCaseFactory } from "@useCases/CreateUser";
import { GetProfileUserUseCaseFactory } from "@useCases/GetProfileUser";
import { UpdateUserProfileUseCaseFactory } from "@useCases/updateProfile";
import { createRecommendationUseCaseFactory } from "@useCases/CreateRecommendation";

export const routerFactory = async (): Promise<Router> => {
  const connection = await CreateDatabaseConnection.createConnection();

  const {
    createUserController,
    userRepository
  } = await CreateUseCaseFactory.build(connection);

  const { changePasswordController } = await ChangePasswordUseCaseFactory.build(
    connection
  );

  const {
    createNewPasswordController
  } = await CreateNewPasswordUseCaseFactory.build(connection);

  const {
    createRecommendationController
  } = await createRecommendationUseCaseFactory.build(connection);

  const { profileUserController } = GetProfileUserUseCaseFactory.build(
    connection
  );

  const { resetPasswordController } = ResetPasswordUseCaseFactory.build(
    connection
  );

  const { logUserController } = LogUserUseCaseFactory.build(connection);

  const { signWithGoogleController } = SignWithGoogleUseCaseFactory.build(
    connection
  );

  const {
    updateUserProfileController
  } = await UpdateUserProfileUseCaseFactory.build(connection);

  const { updateUserController } = await UpdateUserUseCaseFactory.build(
    connection
  );

  const authMiddleware = ensureAuthenticated(userRepository);
  const router = Router();

  router.post("/signin/google", async (request, response) => {
    return signWithGoogleController.handle(request, response);
  });

  router.post("/signin", async (request, response) => {
    return logUserController.handle(request, response);
  });

  router.post("/users", (request, response) => {
    return createUserController.handle(request, response);
  });

  router.post("/users/reset-password", async (request, response) => {
    return resetPasswordController.handle(request, response);
  });

  router.patch("/users/password/new", async (request, response) => {
    return createNewPasswordController.handle(request, response);
  });

  router.patch("/users/password", authMiddleware, async (request, response) => {
    return changePasswordController.handle(request, response);
  });

  router.patch("/users", authMiddleware, async (request, response) => {
    return updateUserController.handle(request, response);
  });

  router.get("/profile", authMiddleware, (request, response) => {
    return profileUserController.handle(request, response);
  });

  router.patch("/profile", authMiddleware, async (request, response) => {
    return updateUserProfileController.handle(request, response);
  });

  router.post("/user/recommendation", authMiddleware, (request, response) => {
    return createRecommendationController.handle(request, response);
  });

  return router;
};
