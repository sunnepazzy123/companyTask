
# NetGuru Recruitment Task

> a User service.
> a Movie service.

## Api Features

- User (GET, POST, PUT, DELETE of User)
- Movie (GET, POST of Movie)
- Subscription (GET, PUT of User)

## Usage

### Env Variables

The .env file is set and ready to be use for each Service, the Base_URL should not be edited.

```
PORT = your port || 8888 // Auth service
PORT = your port || 8889 // Movie service
BASE_URL = https://omdbapi.com
MONGO_URI = your mongodb uri ||  default uri is given

```

### Install Dependencies

```
cd auth-service && npm install
cd movie-service && npm install

```

### Run Seeder on the Auth Service
    create a dummy data from the example data given to me
```
npm run seed:run

```

## Users

The auth service defines two user accounts that you should use after running seed command

1. `Basic` user

```
 username: 'basic-thomas'
 password: '12345'
```

1. `Premium` user

```
username: 'premium-jim'
password: '12345'
```


### Run
```
# For Development
npm run start

```

## Auth Service Api Doc
```
    Remember jwtToken is created when you login and it is required when you make request just as instructed

GET ~~ http://localhost:8888/api/auth
GET_ID ~~ http://localhost:8888/api/auth/{id}
POST ~~ http://localhost:8888/api/auth
PUT ~~ http://localhost:8888/api/auth/{id}
DELETE ~~ http://localhost:8888/api/auth/{id}
POST ~~ http://localhost:8888/api/auth/login

GET_ID ~~ http://localhost:8888/api/auth/subscription
PUT ~~ http://localhost:8888/api/auth/subscription{id}

```

## Movie Service Api Doc

```
GET ~~ http://localhost:8889/api/movie
GET_ID ~~ http://localhost:8889/api/movie/{id}
POST ~~ http://localhost:8889/api/movie

```

## Docker and K8s Build
```
    The Infra folder contain the deployment config file for each service
    The skaffold.yaml file allow you to push code automatically withing this workflow.

    cd into the infra folder, that is where the deployment for each service reside.
```
## Swagger UI Api
```
    http://localhost:8889/api-docs

    i have little time for this task and i was unable to complete the swagger UI Docs and swagger api,
    it was done half way

```
 