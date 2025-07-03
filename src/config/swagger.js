const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task List API',
      version: '1.0.0',
      description: 'API para gerenciamento de tarefas e usuários.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: ['./src/routes.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);