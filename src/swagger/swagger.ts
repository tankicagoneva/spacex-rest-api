import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const swaggerFilePath = path.join(process.cwd(), "src", "docs", "api-doc.yaml"); 
const swaggerSpec = yaml.load(fs.readFileSync(swaggerFilePath, "utf8")) as Record<string, any>;

export const swaggerDocs = swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    supportedSubmitMethods: ["get", "post", "put", "delete"],
  },})
export const swaggerServe = swaggerUi.serve;