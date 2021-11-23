import { IRecommendation } from "@domain/recommendation/recommendation";
import { IRecommedationData } from "@providers/RecommendationProvider/models/IRecommendationProvider";

export const externalizeRecommendations = (
  recommendations: IRecommedationData[]
): IRecommendation[] => {
  return recommendations.map((r: IRecommedationData) => {
    return {
      name: r.estabelecimento,
      description: r.descricao,
      openAt: r.horario_de_funcionamento,
      id: r.id,
      instagram: r.instagram,
      location: r.bairro
    };
  });
};
