const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vehicle Management API',
    description: 'Documentation for the Vehicle Management API'
  },
  host: process.env.HOST,
  schemes: process.env.SCHEME
};

const outputFile = './swagger.json';
const endpointFiles = ['../routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);