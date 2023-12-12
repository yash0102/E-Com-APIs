// 1. Import Express
import express from 'express';
import swagger from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import ProductRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert {type: 'json'};
import { errorHandlerMiddleware } from './src/middlewares/errorHandler.js';

// 2. Create Server
const server = express();

server.use(bodyParser.json());

// CORS policy configuration
var corsOptions = {
    origin: 'http://localhost:5500'
}
server.use(cors(corsOptions));

server.use('/api-docs', swagger.serve , swagger.setup(apiDocs)); 
server.use('/api/products', jwtAuth ,ProductRouter); 
server.use('/api/cartItems', jwtAuth ,cartRouter); 
server.use('/api/users',UserRouter); 

// 3. Default request handler
server.get("/", (req, res) => {
    res.send("Welcome to Ecommerce APIs");
})

// Error handler middleware (sholud be in last)
server.use(errorHandlerMiddleware);

// Middleware to handle 404 requests.
server.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs");
})

// 4. Specify port 
server.listen(3200, ()=> {
    console.log('Server is running on Port: ', 3200);
});