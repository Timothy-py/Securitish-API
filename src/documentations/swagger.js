const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const logger = require("../../logger/logger");

const PORT = process.env.APP_PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Unsafebox API",
      version: "1.0.0",
      description: "API documentation for Unsafebox APIs",
      contact: {
        name: "Unsafebox",
        email: "",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
        description: "Development server",
      },
      {
        // url: 'https://afrisplash-473196ceadbb.herokuapp.com/api/v1',
        // description: 'Production server'
      },
    ],
  },
  apis: ["./src/documentations/*.doc.js"], // documentation files
};

const swaggerSpecs = swaggerJsDoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
  });
  logger.info(
    `Dev: Swagger Docs available at http://localhost:${port}/api-docs`
  );
  //   console.log('Prod: Swager Docs available at https://afrisplash-473196ceadbb.herokuapp.com/api-docs')
  return;
}

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description OpenAPI Documentation
 */
module.exports = swaggerDocs;
