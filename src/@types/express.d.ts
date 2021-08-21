// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
    };
  }
}

declare module "express-async-errors";
