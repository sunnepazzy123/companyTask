import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  "definition": {
    "openapi": "3.0.1",
    "info": {
      "title": "NetGuru Movie Api",
      "description": "This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.",
      "termsOfService": "http://swagger.io/terms/",
      "contact": {
        "email": "sunnepazzy123@gmail.com"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
      "version": "1.0.0"
    },
    "externalDocs": {
      "description": "Find out more about Swagger",
      "url": "http://swagger.io"
    },
    "servers": [
      {
        "url": "http://localhost:8888/api"
      },
      {
        "url": "http://localhost:8889/api"
      }
    ],
    "tags": [
      {
        "name": "auth",
        "description": "Operations about user",
        "externalDocs": {
          "description": "Find out more about our store",
          "url": "http://swagger.io"
        }
      }
    ],
    "paths": {
      "/auth": {
        "post": {
          "tags": [
            "auth"
          ],
          "summary": "Create user",
          "description": "This create a new user.",
          "operationId": "createUser",
          "requestBody": {
            "description": "Created user object",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/Auth"
                }
              }
            },
            "required": true
          },
          "responses": {
            "default": {
              "description": "successful operation",
              "content": {}
            }
          },
          "x-codegen-request-body-name": "body"
        }
      },
      "/movie": {
        "post": {
          "tags": [
            "movie"
          ],
          "summary": "create a movie",
          "requestBody": {
            "description": "create a new movie",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object",
                  "items": {
                    "$ref": "#/components/schemas/Movie"
                  }
                }
              }
            },
            "required": true
          },
          "responses": {
            "default": {
              "description": "successful operation",
              "content": {}
            }
          },
          "x-codegen-request-body-name": "body"
        }
      }
    },
    "components": {
      "schemas": {
        "Auth": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "role": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        },
        "Movie": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            }
          }
        },
        "ApiResponse": {
          "type": "object",
          "properties": {
            "code": {
              "type": "integer",
              "format": "int32"
            },
            "type": {
              "type": "string"
            },
            "message": {
              "type": "string"
            }
          }
        }
      }
    }
  },
  "apis": ["./routes/*.ts"]
}



export const specs = swaggerJsDoc(options);