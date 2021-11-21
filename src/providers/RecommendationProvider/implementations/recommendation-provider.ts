import { IRecommendationPayload } from "@domain/recommendation-request/recommendation-request";
import { IRecommendationProvider } from "../models/IRecommendationProvider";

export default class RecommendationProvider implements IRecommendationProvider {
  public async getRecommendations(
    payload: IRecommendationPayload
  ): Promise<any> {
    console.log(payload);
    return [
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" }
    ];
  }
}
