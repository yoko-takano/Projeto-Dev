import { createSwaggerSpec } from "next-swagger-doc";

export default function handler(request, response) {
  const spec = createSwaggerSpec({
    apiFolder: "pages/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Projeto Dev API",
        version: "1.0.0",
      },
    },
  });

  response.status(200).json(spec);
}
