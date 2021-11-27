import HttpProviderFactory from "@providers/factories/HttpFactory";
import RecommendationProvider from "./implementations/recommendation-provider";

export default function makeRecommendationProvider(): any {
  const recommendationHttpProvider = HttpProviderFactory.getInstance();
  const provider = new RecommendationProvider(recommendationHttpProvider);

  return provider;
}
