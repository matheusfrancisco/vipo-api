import Http from "@config/https";
import { IRecommendationPayload } from "@domain/recommendation-request/recommendation-request";
import { IHTTPProvider } from "@providers/Axios/axios-provider";
import { IRecommendationProvider } from "../models/IRecommendationProvider";

export default class RecommendationProvider implements IRecommendationProvider {
  constructor(private http: IHTTPProvider) {}

  public async getRecommendations(
    payload: IRecommendationPayload
  ): Promise<any> {
    try {
      const { data } = await this.http.post<{ data: { recommendations: any } }>(
        `${Http.PATHS.RECOMMENDATIONS.CREATE}/${payload.user}`,
        {
          ...payload
        }
      );
      const { recommendations } = data;

      return this.adpaterRecommendations(recommendations.recommendations);
    } catch (error) {
      console.log(error);
      return [
        { name: "Bar do jao", description: "noite boa" },
        { name: "Bar do jao", description: "noite boa" },
        { name: "Bar do jao", description: "noite boa" }
      ];
    }
  }

  private adpaterRecommendations(recommendations: any) {
    return recommendations.map((r: any) => {
      return {
        name: r.estabelecimento,
        desciption: r.descricao,
        openAt: r.horario_de_funcionamento,
        id: r.id,
        instagram: r.instagram,
        location: r.bairro
      };
    });
  }
}
