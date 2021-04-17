import { Router } from "express";
import ensureAuthenticated from "@infrastructure/middlewares/ensureAuthenticated";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { LogUserUseCaseFactory } from "@useCases/LogUser";
import { SignWithGoogleUseCaseFactory } from "@useCases/SignWithGoogleUseCase";
import { GetProfileUserUseCaseFactory } from "@useCases/GetProfileUser";
import { UpdateUserProfileUseCaseFactory } from "@useCases/updateProfile";
import userRoutes from "@infrastructure/routes/user";

export const routerFactory = async (): Promise<Router> => {
  await CreateDatabaseConnection.createConnection();

  const { profileUserController } = GetProfileUserUseCaseFactory.build();

  const { logUserController } = LogUserUseCaseFactory.build();

  const { signWithGoogleController } = SignWithGoogleUseCaseFactory.build();

  const {
    updateUserProfileController
  } = await UpdateUserProfileUseCaseFactory.build();

  const router = Router();

  router.use("/users", userRoutes);

  router.post("/signin/google", async (request, response) => {
    return signWithGoogleController.handle(request, response);
  });

  router.post("/signin", async (request, response) => {
    return logUserController.handle(request, response);
  });

  router.get("/profile", ensureAuthenticated, (request, response) => {
    return profileUserController.handle(request, response);
  });

  router.patch("/profile", ensureAuthenticated, async (request, response) => {
    return updateUserProfileController.handle(request, response);
  });

  return router;
};
