import express, { Response } from 'express';

export const factoryServer = ({ userController }: any) => {
  const server = express();

  server.use(express.json());

  server.get('/', (_, res: Response) => {
    res.send('Hello world');
  });


  return server;
};
