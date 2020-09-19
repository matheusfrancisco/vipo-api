import 'reflect-metadata';
import { factoryServer } from './server';

(async () => {

  const server = factoryServer({
    userController: {},
  });

  server.listen(3000, () => {});
})();
