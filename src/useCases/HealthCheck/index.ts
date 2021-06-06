import { getManager } from "typeorm";
import { Liveness } from "./liveness-controller";
import { HealthCheck } from "./readness-controller";

interface IBuildResult {
  livenessController: Liveness;
  healthCheckController: HealthCheck;
}

export class healthcheckUseCaseFactory {
  public static async build(): Promise<IBuildResult> {
    const queryManager = getManager();
    const livenessController = new Liveness();
    const healthCheckController = new HealthCheck(queryManager);

    return { livenessController, healthCheckController };
  }
}
