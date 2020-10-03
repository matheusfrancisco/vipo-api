import { Router } from "express";
import { createUseCaseFactory } from "./src/useCases/CreateUser";

export const routerFactory = async () => {
  const { userController } = await createUseCaseFactory.build();
  const router = Router();

  router.post("/users", (request, response) => {
    return userController.handle(request, response);
  });

  return router;
};
