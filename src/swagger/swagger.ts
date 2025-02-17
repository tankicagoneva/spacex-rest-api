import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SpaceX Launchpads API",
      version: "1.0.0",
      description: "A REST API for SpaceX Launchpads",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: [
    "./src/docs/routes/*.yaml",
    "./src/docs/schemas/*.yaml",
    "./src/routes/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    supportedSubmitMethods: ["get", "post", "put", "delete"],
  },})
export const swaggerServe = swaggerUi.serve;