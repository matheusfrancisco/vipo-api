import { IRecommendationPayload } from "@domain/recommendation-request/recommendation-request";

export interface IRecommedationData {
  estabelecimento: string;
  descricao: string;
  // eslint-disable-next-line camelcase
  horario_de_funcionamento: string;
  id: number;
  instagram: string;
  bairro: string;
  image?: string;
}
export interface IRecommendationProvider {
  getRecommendations(
    payload: IRecommendationPayload
  ): Promise<IRecommedationData[]>;
}
