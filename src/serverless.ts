import  serverless from "serverless-http";
import { createHttpApp } from "./index";

module.exports.handler = function(
  evt: AWSLambda.APIGatewayProxyEvent | AWSLambda.APIGatewayProxyEventV2,
  ctx:  AWSLambda.Context,
  callback: any) {
  createHttpApp()
  .then(app => serverless(app))
  .then(proxy => proxy(evt, ctx)).catch(err => console.log(err))
}

