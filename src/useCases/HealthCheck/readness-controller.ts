import { EntityManager } from "typeorm";
import { Request, Response } from "express";

export class HealthCheck {
  constructor(private queryManager: EntityManager) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.queryManager.query("select 1;");
      return response.status(200).json({ check: "database on" });
    } catch (e) {
      return response.status(500).json({ check: "error on database" });
    }
  }
}
