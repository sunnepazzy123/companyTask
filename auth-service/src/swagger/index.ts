import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description: "A simple Express Movie Library APR "
    },
    servers: [
      {
        uri: "hhtp://localhost:5000"
      }
    ],
    },
  apis: ["./routes/*.ts"]
}

export const specs = swaggerJsDoc(options);