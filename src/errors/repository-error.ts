import { ServiceError } from "@errors/service-error";

interface KnownRepositoryErrors {
  message: string;
  status: ServiceError["status"];
}

const ErrorNamesEnum: Record<string, KnownRepositoryErrors> = {
  EntityNotFound: {
    message: "This resource does not exist.",
    status: 404
  }
};

export class RepositoryError extends ServiceError {
  constructor(message: string, name: string, stack?: string) {
    super("Internal server error", 500);

    console.error(message);
    if (stack) console.error(stack);

    this.constructServiceErrorFromName(name);
  }

  private constructServiceErrorFromName(name: string) {
    const knownError = ErrorNamesEnum[name];

    if (!knownError) return;

    this.message = knownError.message;
    this.status = knownError.status;
  }
}
