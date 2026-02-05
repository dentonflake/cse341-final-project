const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vehicle Management API',
    description: 'Documentation for the Vehicle Management API'
  },
  host: 'cse341-final-project-1zc7.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointFiles = ['../routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);