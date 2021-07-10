import { createServer, proxy } from "aws-serverless-express";
import { Context, APIGatewayProxyEvent } from "aws-lambda";
import { createHttpApp } from "./index";
import { Server } from "http";

let httpApp;
let httpServer: Server;

(async () => {
  try {
    httpApp = await createHttpApp();
    httpServer = createServer(httpApp);
  } catch (e) {
    console.log("error build your app");
    // Deal with the fact the chain failed
  }
})();

export const handler = (event: APIGatewayProxyEvent, context: Context) =>
  proxy(httpServer, event, context, "PROMISE").promise;
