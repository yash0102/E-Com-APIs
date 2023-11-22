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

// 2. Create Server
const server = express();

server.use(bodyParser.json());

// CORS policy configuration
var corsOptions = {
    origin: 'http://localhost:5500'
}
server.use(cors(corsOptions));

// server.use(cors()); allow to everyone origin, headers, methods

// server.use((req, res, next)=> {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//     res.header('Access-Control-Allow-Headers', '*'); // "*" means allow to every one
//     res.header('Access-Control-Allow-Methods', '*');
//     // return ok for preflight request.
//     if (req.method == "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// })

// for all requests related to product , redirect to product routes.
server.use('/api-docs', swagger.serve , swagger.setup(apiDocs)); 
server.use('/api/products', jwtAuth ,ProductRouter); 
server.use('/api/cartItems', jwtAuth ,cartRouter); 
server.use('/api/users',UserRouter); 

// 3. Default request handler
server.get("/", (req, res) => {
    res.send("Welcome to Ecommerce APIs");
})

// Middleware to handle 404 requests.
server.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs");
})

// 4. Specify port 
server.listen(3200, ()=> {
    console.log('Server is running on Port: ', 3200);
});