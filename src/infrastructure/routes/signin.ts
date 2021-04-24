import { Router } from "express";
import { LogUserUseCaseFactory } from "@useCases/LogUser";
import { SignWithGoogleUseCaseFactory } from "@useCases/SignWithGoogleUseCase";

const signinRoutes = Router();

const { logUserController } = LogUserUseCaseFactory.build();
const { signWithGoogleController } = SignWithGoogleUseCaseFactory.build();

signinRoutes.post("/google", async (request, response) => {
  return signWithGoogleController.handle(request, response);
});

signinRoutes.post("/", async (request, response) => {
  return logUserController.handle(request, response);
});

export default signinRoutes;
