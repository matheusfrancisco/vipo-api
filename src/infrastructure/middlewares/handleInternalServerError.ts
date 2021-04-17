import { ErrorRequestHandler } from "express";
import { ServiceError } from "@errors/service-error";

const handleInternalServerError: ErrorRequestHandler = async (
  error,
  request,
  response
) => {
  console.error(error.message);

  const serviceError = new ServiceError("Internal server error", 500);

  return response
    .status(serviceError.status)
    .json(serviceError.getServerResponse());
};

export default handleInternalServerError;
