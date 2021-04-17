import { Router } from "express";
import ensureAuthenticated from "@infrastructure/middlewares/ensureAuthenticated";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { ChangePasswordUseCaseFactory } from "@useCases/ChangePassword";
import { LogUserUseCaseFactory } from "@useCases/LogUser";
import { SignWithGoogleUseCaseFactory } from "@useCases/SignWithGoogleUseCase";
import { ResetPasswordUseCaseFactory } from "@useCases/ResetPassword";
import { CreateNewPasswordUseCaseFactory } from "@useCases/CreateNewPassword";
import { UpdateUserUseCaseFactory } from "@useCases/UpdateUser";
import { CreateUseCaseFactory } from "@useCases/CreateUser";
import { GetProfileUserUseCaseFactory } from "@useCases/GetProfileUser";
import { UpdateUserProfileUseCaseFactory } from "@useCases/updateProfile";
import { createRecommendationUseCaseFactory } from "@useCases/CreateRecommendation";

export const routerFactory = async (): Promise<Router> => {
  await CreateDatabaseConnection.createConnection();

  const { createUserController } = await CreateUseCaseFactory.build();

  const {
    changePasswordController
  } = await ChangePasswordUseCaseFactory.build();

  const {
    createNewPasswordController
  } = await CreateNewPasswordUseCaseFactory.build();

  const {
    createRecommendationController
  } = await createRecommendationUseCaseFactory.build();

  const { profileUserController } = GetProfileUserUseCaseFactory.build();

  const { resetPasswordController } = ResetPasswordUseCaseFactory.build();

  const { logUserController } = LogUserUseCaseFactory.build();

  const { signWithGoogleController } = SignWithGoogleUseCaseFactory.build();

  const {
    updateUserProfileController
  } = await UpdateUserProfileUseCaseFactory.build();

  const { updateUserController } = await UpdateUserUseCaseFactory.build();

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

  router.patch(
    "/users/password",
    ensureAuthenticated,
    async (request, response) => {
      return changePasswordController.handle(request, response);
    }
  );

  router.patch("/users", ensureAuthenticated, async (request, response) => {
    return updateUserController.handle(request, response);
  });

  router.get("/profile", ensureAuthenticated, (request, response) => {
    return profileUserController.handle(request, response);
  });

  router.patch("/profile", ensureAuthenticated, async (request, response) => {
    return updateUserProfileController.handle(request, response);
  });

  router.post(
    "/user/recommendation",
    ensureAuthenticated,
    (request, response) => {
      return createRecommendationController.handle(request, response);
    }
  );

  return router;
};
