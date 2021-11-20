type StatusOptions = 400 | 403 | 404 | 500;
interface IServerResponse {
  message: string;
}

export class ServiceError extends Error {
  constructor(public message: string, public status: StatusOptions = 400) {
    super(message);
  }

  public getServerResponse(): IServerResponse {
    return {
      message: this.message
    };
  }
}
