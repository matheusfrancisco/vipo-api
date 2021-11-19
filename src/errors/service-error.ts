type StatusOptions = 400 | 403 | 404 | 500;
interface IServerResponse {
  message: string;
}

const messageErrors = [
  {
    key: "user_already_exist",
    message: "Usuário já cadastrado"
  },
  {
    key: "user_not_exist",
    message: "Usuário não existe"
  },
  {
    key: "under_age",
    message: "Usuário não possui a idade mínima"
  },
  {
    key: "over_age",
    message: "Usuário acima da idade permitida"
  }
];

export class ServiceError extends Error {
  constructor(public message: string, public status: StatusOptions = 400) {
    super(message);
  }

  public getServerResponse(): IServerResponse {
    const teste = messageErrors.filter(
      errorKey => errorKey.key === this.message
    );

    return {
      message: teste[0].message
    };
  }
}
