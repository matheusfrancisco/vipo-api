import Http from "@config/https";

export interface IRequestConfig {
  params?: any;
  headers?: any;
}

export interface IHTTPProvider {
  delete<T = unknown>(path: string, config?: IRequestConfig): Promise<T>;
  get<T = unknown>(path: string, config?: IRequestConfig): Promise<T>;
  patch<T = unknown>(
    path: string,
    body?: unknown,
    config?: IRequestConfig
  ): Promise<T>;
  post<T = unknown>(
    path: string,
    body?: unknown,
    config?: IRequestConfig
  ): Promise<T>;
  put<T = unknown>(
    path: string,
    body?: unknown,
    config?: IRequestConfig
  ): Promise<T>;
}

export default class AxiosHttpProvider implements IHTTPProvider {
  public async delete<T = unknown>(
    path: string,
    config?: IRequestConfig
  ): Promise<T> {
    return Http.instance.delete(path, config);
  }

  public async get<T = unknown>(
    path: string,
    config?: IRequestConfig
  ): Promise<T> {
    return Http.instance.get(path, config);
  }

  public async patch<T = unknown>(
    path: string,
    body?: unknown,
    config?: IRequestConfig
  ): Promise<T> {
    return Http.instance.patch(path, body, config);
  }

  public async post<T = unknown>(
    path: string,
    body?: unknown,
    config?: IRequestConfig
  ): Promise<T> {
    return Http.instance.post(path, body, config);
  }

  public async put<T = unknown>(
    path: string,
    body?: unknown,
    config?: IRequestConfig
  ): Promise<T> {
    return Http.instance.put(path, body, config);
  }
}
