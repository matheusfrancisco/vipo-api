import { Request, Response } from "express";

export class Liveness {
  public async handle(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ check: "liveness version 0.10" });
  }
}
