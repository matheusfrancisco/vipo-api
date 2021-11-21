import RecommendationProvider from "./implementations/recommendation-provider";

export default function makeRecommendationProvider(): any {
  const provider = new RecommendationProvider();

  return provider;
}
