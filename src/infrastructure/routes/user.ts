import { Router } from "express";
import ensureAuthenticated from "@infrastructure/middlewares/ensureAuthenticated";
import { CreateUseCaseFactory } from "@useCases/CreateUser";
import { ChangePasswordUseCaseFactory } from "@useCases/ChangePassword";
import { CreateNewPasswordUseCaseFactory } from "@useCases/CreateNewPassword";
import { ResetPasswordUseCaseFactory } from "@useCases/ResetPassword";
import { UpdateUserUseCaseFactory } from "@useCases/UpdateUser";
import { CreateRecommendationUseCaseFactory } from "@useCases/CreateRecommendation";
import { ReceiveFeedbackUseCaseFactory } from "@useCases/ReceiveFeedback";

const userRoutes = Router();

const { createUserController } = CreateUseCaseFactory.build();
const { changePasswordController } = ChangePasswordUseCaseFactory.build();
const { createNewPasswordController } = CreateNewPasswordUseCaseFactory.build();
const { resetPasswordController } = ResetPasswordUseCaseFactory.build();
const { updateUserController } = UpdateUserUseCaseFactory.build();
const {
  createRecommendationController
} = CreateRecommendationUseCaseFactory.build();
const { receiveFeedbackController } = ReceiveFeedbackUseCaseFactory.build();

userRoutes.post("/", (request, response) => {
  return createUserController.handle(request, response);
});

userRoutes.post("/reset-password", async (request, response) => {
  return resetPasswordController.handle(request, response);
});

userRoutes.patch("/password/new", async (request, response) => {
  return createNewPasswordController.handle(request, response);
});

userRoutes.patch(
  "/password",
  ensureAuthenticated,
  async (request, response) => {
    return changePasswordController.handle(request, response);
  }
);

userRoutes.patch("/", ensureAuthenticated, async (request, response) => {
  return updateUserController.handle(request, response);
});

userRoutes.post("/recommendation", ensureAuthenticated, (request, response) => {
  return createRecommendationController.handle(request, response);
});

userRoutes.post(
  "/feedback/:establishmentId",
  ensureAuthenticated,
  async (request, response) => {
    return receiveFeedbackController.handle(request, response);
  }
);

// #TODO create route to save liked recommendationId and disliked recommendationIds

export default userRoutes;
