
# NetGuru Recruitment Task

> a User service.
> a Movie service

## Features

- User (GET, POST and ID of User)
- Movie (GET, POST and ID of User)
- Subscription

## Usage

### Env Variables

The .env file is set and ready to be use, the BaseUrl should not be edited.

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

## Docker and K8s Build
```
    The Infra folder contain the deployment config file for each service
    The skaffold.yaml file allow you to push code automatically withing this workflow
```