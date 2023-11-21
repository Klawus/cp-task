# Code&Pepper Recruitment Task

Quick comment: I know it's a little bit over engineered but I did it on purpose, I want to show what I can do :D Also, I added one validation (Length of the name) as a business requirement to the domain model to avoid an "Anemic model pattern".

Star Wars backend implemented with Node.js & Typescript.

Application based on docker so can be deployed on any service which supports docker image. (AWS ECS / AWS Fargate / GCP Cloud Run).

The repository also contains GitHub workflow which starts tests / checks code.

##

### Configuration of app

1. Copy docker-compose.override

   ```
   $ cp docker-compose.override.yml.dist docker-compose.override.yml
   ```

2. Create `.env` file from `.env.dist`

   ```
   $ cp .env.dist .env
   ```

3. Run `npm i`

4. Run `npm run docker-build`

5. Run watch - `npm run watch`

6. Run Application - `npm run start`

##

### Commands & Urls

Documentation

```
http://localhost:2000/docs
```

Adminer

```
http://localhost:8080
```

Run integration tests

```
$ npm run integration
```

Run unit tests

```
$ npm run units
```

##

### Most important libraries & Technologies

### Application

1. Express.js

2. Typeorm

3. Awilix

4. Docker

### Tests

4. Mocha

5. Chai

6. Supertest

##
