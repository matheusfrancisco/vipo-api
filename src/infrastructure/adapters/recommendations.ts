import {
  IRecommendation,
  IUserRecommendationData
} from "@domain/recommendation/recommendation";
import { IRecommedationData } from "@providers/RecommendationProvider/models/IRecommendationProvider";

export const externalizeRecommendations = (
  userRecommentation: IUserRecommendationData
): IRecommendation[] => {
  return userRecommentation.recommendations.map((r: IRecommendation) => {
    return {
      name: r.name,
      description: r.description,
      openAt: r.openAt,
      id: r.id,
      instagram: r.instagram,
      location: r.location
    };
  });
};

export const toRepository = (
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
