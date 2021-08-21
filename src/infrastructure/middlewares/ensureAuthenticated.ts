import makeTokenProvider from "@providers/TokenProvider";
import { RequestHandler, Request } from "express";
import { ServiceError } from "@errors/service-error";
import UsersRepositoryFactory from "@infrastructure/database/factories/users-repository-factory";

interface ITokenPayload {
  id: string;
  email: string;
}


const ensureAuthenticated: RequestHandler = async (request: Request, _, next) => {
  const { authorization } = request.headers;

  if (!authorization) throw new ServiceError("Headers missing.");

  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer" || !token || token === "undefined")
    throw new ServiceError("Bad jwt token sent");

  const usersRepository = UsersRepositoryFactory.make();
  const tokenProvider = makeTokenProvider();

  const userPayload = await tokenProvider.decodeToken<ITokenPayload>(token);

  const userExists = await usersRepository.findByEmail(userPayload.email);

  if (!userExists) throw new ServiceError("Unauthorized", 403);

  request.user = userPayload;

  return next();
};

export default ensureAuthenticated;
