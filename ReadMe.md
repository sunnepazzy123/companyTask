
# NetGuru Recruitment Task: 
I redefined all this services from crash...

> a User service.
> a Movie service.

## Api Features

- User (GET, POST, PUT, DELETE of User)
- Movie (GET, POST of Movie)
- Subscription (GET, PUT of User)

## Usage

### Application Stack

```
MongoDB // Database,
ExpressJs // ServerSide Framework built on Node

```
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

## Users Service

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
## Movie Service

you need to be authenticated before you can used this endpoint, token is required in the header

1. `Create a movie`

```
    {title: "Prison Break"}
```


# Note:
you can create your own user or movie...The swagger Api Doc is not complete for now... ):


### Run each services
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
PUT ~~ http://localhost:8888/api/auth/subscription/{id}

```

## Movie Service Api Doc

```
GET ~~ http://localhost:8889/api/movie
GET_ID ~~ http://localhost:8889/api/movie/{id}
POST ~~ http://localhost:8889/api/movie

```

## Test EndPoint using Headless Browser
```
e.g Postman

```

## Testing using Jest
```
    suite environment for jest 
   -> cd auth-service && npm run test

I only have little time for this but the test suite is working fine for the test cases...
```

## Docker and K8s Instructions
```
    The Infra folder contain all the kubernetes config files for each service
    The skaffold.yaml file allow you to push code automatically withing this workflow.
   
```
## Create a Kubernetes Service for each Deployment
```
    cd into the infra folder, that is where the deployments for each service reside.

    In your Terminal inside the Infra Folder:
    -> kubectl apply -f mandatory.yaml    // this will provision a load balancer service outside our cluster
    -> kubectl apply -f loadBalancer.yaml // this will create load balancer with ingressNginx within our cluster
    -> kubectl apply -f ingress-srv.yaml // this will create a routing rules for ingressNginx
    -> kubectl apply -f auth-depl.yaml // this will create a deployment & service for Auth Service
    -> kubectl apply -f movie-depl.yaml // this will create a deployment & service for Movie Service

    Note: Kubernetes need to be install as a tool inside your docker before this set of command will work,
    There will be an issue with creating an image because my DockerId is included in this workflow, Kindly 
    run each service manually with building an image if you can from the endpoint i gave you from above.. ):
    Thanks for understanding.
    
```
## Steps to Build an Image
```
    cd auth-service && run docker build -t <dockerId/NameOfImage> .
    cd movie-service && run docker build -t <dockerId/NameOfImage> .
```
```
    cd auth-service && run docker build -t <dockerId/NameOfImage> .
    cd movie-service && run docker build -t <dockerId/NameOfImage> .
```
## Swagger UI Api
```
    http://localhost:8889/api-docs

    i have little time for this task and i was unable to complete the swagger UI Docs and swagger api,
    it was done half way... 

```
 