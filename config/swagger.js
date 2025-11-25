const swaggerJsdoc = require('swagger-jsdoc');
const { getBaseUrl } = require('./constants');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boycott API',
      version: '1.0.0',
      description: 'Backend API providing data about alternatives to non-ethical products',
    },
    servers: [
      {
        url: getBaseUrl(),
        description: process.env.VERCEL_URL ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ['./server.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;

