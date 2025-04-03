import swaggerUi from "swagger-ui-express"
import yaml from "js-yaml"
import fs from "fs"
import path from "path"

const swaggerFilePath = process.env.LAMBDA_TASK_ROOT
  ? path.resolve(process.env.LAMBDA_TASK_ROOT, "./docs/api-doc.yaml")
  : path.join(process.cwd(), "docs", "api-doc.yaml")
const swaggerSpec = yaml.load(
  fs.readFileSync(swaggerFilePath, "utf8"),
) as Record<string, any>

export const swaggerDocs = swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    supportedSubmitMethods: ["get", "post", "put", "delete"],
  },
  explorer: true,
})

export const swaggerServe = swaggerUi.serve

export const swaggerJSON = swaggerSpec
