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

## TODO

- [x] Fix all unit test
- [x] Add ci.yml to run tests
- [x] Authentication
- [x] Improve connection DB
- [x] SingIn
- [x] Add migration
- [ ] Run docker test and docker productions
- [ ] Fix all integration test
- [ ] Add docker to run in CI
- [ ] Improve email validator
