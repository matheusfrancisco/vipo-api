import { IUserRepository } from "@domain/user/user-repository";
import makeTokenProvider from "@providers/TokenProvider";
import { RequestHandler } from "express";
import { ServiceError } from "@errors/service-error";

interface ITokenPayload {
  id: string;
  email: string;
}

type IEnsureAuthenticated = (
  usersRepository: IUserRepository
) => RequestHandler;

const ensureAuthenticated: IEnsureAuthenticated = usersRepository => async (
  request,
  _,
  next
) => {
  const { authorization } = request.headers;

  if (!authorization) throw new ServiceError("Headers missing.");

  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer" || !token || token === "undefined")
    throw new ServiceError("Bad jwt token sent");

  const tokenProvider = makeTokenProvider();

  const userPayload = await tokenProvider.decodeToken<ITokenPayload>(token);

  const userExists = await usersRepository.findByEmail(userPayload.email);

  if (!userExists) throw new ServiceError("Unauthorized", 403);

  request.user = userPayload;

  return next();
};

export default ensureAuthenticated;
