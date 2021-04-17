import ensureAuthenticated from "@infrastructure/middlewares/ensureAuthenticated";
import { GetProfileUserUseCaseFactory } from "@useCases/GetProfileUser";
import { UpdateUserProfileUseCaseFactory } from "@useCases/updateProfile";
import { Router } from "express";

const profileRoutes = Router();

const { profileUserController } = GetProfileUserUseCaseFactory.build();
const { updateUserProfileController } = UpdateUserProfileUseCaseFactory.build();

profileRoutes.get("/", ensureAuthenticated, (request, response) => {
  return profileUserController.handle(request, response);
});

profileRoutes.patch("/", ensureAuthenticated, async (request, response) => {
  return updateUserProfileController.handle(request, response);
});

export default profileRoutes;
