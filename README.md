## Try to improve solid and architecture code with layer design

## How to Run

```bash
docker-compose up -d
```

## Run migrations

```bash
npm install -g typescript
ts-node node_modules/typeorm/cli.js migration:run
```

## Create new migration base on entity

```bash
ts-node node_modules/typeorm/cli.js migration:generate -n entity-name
```

create new migration

```bash
./node_modules/.bin/typeorm migration:create -n table-name
```

```bash
npm i
npm run start
```

## To run tests

```bash
docker-compose up -d
```

You need up database to run all tests

```bash
npm run test
```

## Run in prod

```bash
sudo npm i -g pm2
# install nvm and use 10.14.1
# then use the same node version to sudo
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
npm i
npm run start
```
