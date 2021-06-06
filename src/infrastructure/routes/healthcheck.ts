import { healthcheckUseCaseFactory } from "@useCases/HealthCheck";
import { Router } from "express";

const buildHealthCheck = async () => {
  const {
    livenessController,
    healthCheckController
  } = await healthcheckUseCaseFactory.build();
  const healthcheckRoutes = Router();

  healthcheckRoutes.get("/liveness", (request, response) => {
    return livenessController.handle(request, response);
  });

  healthcheckRoutes.get("/readness", async (request, response) => {
    return healthCheckController.handle(request, response);
  });

  return healthcheckRoutes;
};

export default buildHealthCheck;
