import AxiosHttpProvider, {
  IHTTPProvider
} from "@providers/Axios/axios-provider";

export default class HttpProviderFactory {
  private static instance: IHTTPProvider;

  public static getInstance(): IHTTPProvider {
    if (!HttpProviderFactory.instance) {
      HttpProviderFactory.instance = new AxiosHttpProvider();
    }

    return HttpProviderFactory.instance;
  }
}
