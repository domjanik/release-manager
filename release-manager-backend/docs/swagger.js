/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '2.0.0',      // by default: '1.0.0'
        title: 'CloudAgent Apis',        // by default: 'REST API'
        description: 'API for Managing queue calls',  // by default: ''
        contact: {
            'name': 'API Support',
            'email': 'rajputankit22@gmail.com'
        },
    },
    host: 3002,      // by default: 'localhost:3000'
    basePath: '/',  // by default: '/'
    schemes: ['http'],   // by default: ['http']
    consumes: ['application/json'],  // by default: ['application/json']
    produces: ['application/json'],  // by default: ['application/json']
    tags: [        // by default: empty Array
        {
            name: 'Queue CRUD',         // Tag name
            description: 'Queue related apis',  // Tag description
        },
        {
            name: 'Health',
            description: 'Health Check'
        }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {
        healthResponse: {
            code: "200",
            message: "Ok",
        },
        'errorResponse.400': {
            code: "400",
            message: "Bad Request",
        },
        'errorResponse.403': {
            code: "404",
            message: "Forbidden",
        },
        'errorResponse.404': {
            "code": "404",
            "message": "Not found",
        },
        'errorResponse.500': {
            code: "500",
            message: "Internal Server Error",
        }
    },          // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['../dist/index.js', '../dist/controllers/*.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
