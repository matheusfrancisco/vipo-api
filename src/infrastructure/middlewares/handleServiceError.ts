import { ErrorRequestHandler } from "express";
import { ServiceError } from "@errors/service-error";

const handleServiceError: ErrorRequestHandler = async (
  error,
  request,
  response,
  next
) => {
  if (error instanceof ServiceError)
    return response.status(error.status).json(error.getServerResponse());

  return next();
};

export default handleServiceError;
