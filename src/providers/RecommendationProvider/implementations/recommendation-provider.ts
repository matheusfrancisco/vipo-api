import Http from "@config/https";
import { IRecommendationPayload } from "@domain/recommendation-request/recommendation-request";
import { IHTTPProvider } from "@providers/Axios/axios-provider";
import {
  IRecommedationData,
  IRecommendationProvider
} from "../models/IRecommendationProvider";

export default class RecommendationProvider implements IRecommendationProvider {
  constructor(private http: IHTTPProvider) {}

  public async getRecommendations(
    payload: IRecommendationPayload
  ): Promise<any> {
    try {
      // #TODO should be fixed this return on r2d2 api
      const data = await this.http.post<{
        recommendations: { recommendations: IRecommedationData };
      }>(`${Http.PATHS.RECOMMENDATIONS.CREATE}/${payload.user}`, {
        ...payload
      });
      const { recommendations } = data;

      return recommendations.recommendations;
    } catch (error) {
      console.log(error);
      return [
        { name: "Bar do jao", description: "noite boa" },
        { name: "Bar do jao", description: "noite boa" },
        { name: "Bar do jao", description: "noite boa" }
      ];
    }
  }
}
