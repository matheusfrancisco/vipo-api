import { ErrorRequestHandler } from "express";
import { ServiceError } from "@errors/service-error";

const handleInternalServerError: ErrorRequestHandler = async (
  error,
  _request,
  response,
  _next
) => {
  const serviceError = new ServiceError("server_error");

  return response
    .status(serviceError.status)
    .json(serviceError.getServerResponse());
};

export default handleInternalServerError;
