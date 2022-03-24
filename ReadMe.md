
# NetGuru Recruitment Task

> a User service.
> a Movie service

## Api Features

- User (GET, POST, PUT, DELETE of User)
- Movie (GET, POST of Movie)
- Subscription (GET, PUT)

## Usage

### Env Variables

The .env file is set and ready to be use, the Base_URL should not be edited.

```
PORT = 8888 // Auth service
PORT = 8889 // Movie service
BASE_URL = https://omdbapi.com
MONGO_URI = your mongodb uri

```

### Install Dependencies

```
cd auth-service && npm install
cd movie-service && npm install

```

### Run
```
# For Development
npm run start

```

## Auth Api Doc
```
GET ~~ http://localhost:8888/api/auth
GET_ID ~~ http://localhost:8888/api/auth/{id}
POST ~~ http://localhost:8888/api/auth
PUT ~~ http://localhost:8888/api/auth/{id}
DELETE ~~ http://localhost:8888/api/auth/{id}
POST ~~ http://localhost:8888/api/auth/login

GET_ID ~~ http://localhost:8888/api/auth/subscription
PUT ~~ http://localhost:8888/api/auth/subscription{id}

```

## Movie Api Doc

```
GET ~~ http://localhost:8888/api/movie
GET_ID ~~ http://localhost:8888/api/movie/{id}
POST ~~ http://localhost:8888/api/movie

```

## Docker and K8s Build
```
    The Infra folder contain the deployment config file for each service
    The skaffold.yaml file allow you to push code automatically withing this workflow
```